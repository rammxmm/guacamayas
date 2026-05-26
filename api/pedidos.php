<?php
// =============================================
// API: PEDIDOS (Guardar y Consultar Historial)
// POST /api/pedidos.php  → Crear pedido
// GET  /api/pedidos.php?usuario_id=X → Historial
// =============================================
require_once 'config.php';

$db = getDB();

// ── GET: Obtener historial de pedidos de un usuario ──────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $usuario_id = intval($_GET['usuario_id'] ?? 0);

    if (!$usuario_id) {
        responder(['success' => false, 'message' => 'usuario_id requerido'], 400);
    }

    // Traer pedidos con sus items
    $stmt = $db->prepare('SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY fecha DESC');
    $stmt->execute([$usuario_id]);
    $pedidos = $stmt->fetchAll();

    foreach ($pedidos as &$pedido) {
        $stmtItems = $db->prepare('SELECT * FROM pedido_items WHERE pedido_id = ?');
        $stmtItems->execute([$pedido['id']]);
        $pedido['items'] = $stmtItems->fetchAll();
    }

    responder(['success' => true, 'pedidos' => $pedidos]);
}

// ── POST: Crear nuevo pedido ─────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $usuario_id        = intval($data['usuario_id']        ?? 0);
    $total             = floatval($data['total']            ?? 0);
    $direccion_entrega = trim($data['direccion_entrega']    ?? '');
    $items             = $data['items']                     ?? [];

    if (!$usuario_id || !$total || empty($items)) {
        responder(['success' => false, 'message' => 'Datos incompletos del pedido'], 400);
    }

    // Verificar que el usuario existe
    $stmt = $db->prepare('SELECT id FROM usuarios WHERE id = ?');
    $stmt->execute([$usuario_id]);
    if (!$stmt->fetch()) {
        responder(['success' => false, 'message' => 'Usuario no encontrado'], 404);
    }

    // Crear el pedido
    $stmt = $db->prepare('INSERT INTO pedidos (usuario_id, total, direccion_entrega) VALUES (?, ?, ?)');
    $stmt->execute([$usuario_id, $total, $direccion_entrega]);
    $pedido_id = $db->lastInsertId();

    // Insertar los items del pedido
    $stmtItem = $db->prepare('INSERT INTO pedido_items (pedido_id, producto_nombre, cantidad, precio_unitario) VALUES (?, ?, ?, ?)');
    foreach ($items as $item) {
        $stmtItem->execute([
            $pedido_id,
            $item['nombre']  ?? 'Producto',
            intval($item['cantidad']       ?? 1),
            floatval($item['precio']       ?? 0),
        ]);
    }

    responder([
        'success'   => true,
        'message'   => '¡Pedido registrado exitosamente!',
        'pedido_id' => $pedido_id
    ]);
}

responder(['success' => false, 'message' => 'Método no soportado'], 405);
