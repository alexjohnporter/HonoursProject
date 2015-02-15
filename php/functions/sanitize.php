<?php
function sanitizeForm($field) {
    $field = html_entity_decode($field); //decodes ASCII into html tags
    $field = strip_tags($field); //strips html tags
    $field = htmlspecialchars($field, ENT_NOQUOTES);
    $field = trim($field);
    return $field;
}