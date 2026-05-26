<?php
// =============================================
// API: LOGIN DE USUARIO
// POST /api/login.php
// =============================================
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(['success' => false, 'message' => 'Método no permitido'], 405);
}

$data = json_decode(file_get_contents('php://input'), true);

$email    = trim($data['email']    ?? '');
$password = $data['password']      ?? '';

if (!$email || !$password) {
    responder(['success' => false, 'message' => 'Correo y contraseña son obligatorios'], 400);
}

$db = getDB();

// Buscar usuario por email
$stmt = $db->prepare('SELECT id, nombre, email, password_hash, telefono, direccion FROM usuarios WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch();

// Verificar contraseña
if (!$user || !password_verify($password, $user['password_hash'])) {
    responder(['success' => false, 'message' => 'Correo o contraseña incorrectos'], 401);
}

// Login exitoso - retornar datos sin contraseña
responder([
    'success' => true,
    'message' => '¡Bienvenido de nuevo!',
    'user' => [
        'id'        => $user['id'],
        'nombre'    => $user['nombre'],
        'email'     => $user['email'],
        'telefono'  => $user['telefono'],
        'direccion' => $user['direccion'],
        'logged'    => true,
    ]
]);
