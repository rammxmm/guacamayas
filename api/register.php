<?php
// =============================================
// API: REGISTRO DE NUEVO USUARIO
// POST /api/register.php
// =============================================
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(['success' => false, 'message' => 'Método no permitido'], 405);
}

// Leer datos JSON del body
$data = json_decode(file_get_contents('php://input'), true);

// Validar campos requeridos
$nombre   = trim($data['nombre']   ?? '');
$apellido = trim($data['apellido'] ?? '');
$email    = trim($data['email']    ?? '');
$password = $data['password']      ?? '';
$telefono = trim($data['telefono'] ?? '');
$direccion= trim($data['direccion']?? '');

if (!$nombre || !$email || !$password) {
    responder(['success' => false, 'message' => 'Nombre, correo y contraseña son obligatorios'], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder(['success' => false, 'message' => 'El correo electrónico no es válido'], 400);
}

if (strlen($password) < 8) {
    responder(['success' => false, 'message' => 'La contraseña debe tener al menos 8 caracteres'], 400);
}

$db = getDB();

// Verificar si el email ya existe
$stmt = $db->prepare('SELECT id FROM usuarios WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    responder(['success' => false, 'message' => 'Este correo ya está registrado'], 409);
}

// Guardar usuario con contraseña hasheada
$hash = password_hash($password, PASSWORD_BCRYPT);
$nombreCompleto = $nombre . ' ' . $apellido;

$stmt = $db->prepare('INSERT INTO usuarios (nombre, email, password_hash, telefono, direccion) VALUES (?, ?, ?, ?, ?)');
$stmt->execute([$nombreCompleto, $email, $hash, $telefono, $direccion]);

$userId = $db->lastInsertId();

// Retornar datos del usuario (sin contraseña)
responder([
    'success' => true,
    'message' => '¡Cuenta creada exitosamente!',
    'user' => [
        'id'     => $userId,
        'nombre' => $nombreCompleto,
        'email'  => $email,
        'telefono' => $telefono,
        'direccion'=> $direccion,
    ]
]);
