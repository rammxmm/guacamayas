<?php
// =============================================
// CONFIGURACIÓN DE BASE DE DATOS
// =============================================
//  C
define('DB_HOST', 'localhost');
define('DB_NAME', 'gcmayas_db');      // Tu base de datos
define('DB_USER', 'gcmayas_user');    // Tu usuario MySQL
define('DB_PASS', 'PnQqkWC*Ef*IQNjA');

// Cabeceras CORS para permitir peticiones desde el frontend
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Conectar a MySQL
function getDB() {
    try {
        $pdo = new PDO(
            'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8',
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]
        );
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos']);
        exit();
    }
}

function responder($data, $codigo = 200) {
    http_response_code($codigo);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit();
}
