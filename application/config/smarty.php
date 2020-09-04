<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// required paths
$config['CacheDir']    = APPPATH.'Smarty/cache';
$config['CompileDir']  = APPPATH.'Smarty/templates_c';
$config['ConfigDir']   = APPPATH.'Smarty/configs';
$config['TemplateDir'] = APPPATH.'templates';

// example configuration for development
$config['caching']          = Smarty::CACHING_OFF;
$config['force_compile']    = FALSE;
$config['compile_check']    = TRUE;
$config['error_unassigned'] = TRUE;
$config['error_reporting']  = E_ALL | E_STRICT;
$config['debugging']        = FALSE;

/*
// example configuration for production
$config['caching']          = Smarty::CACHING_LIFETIME_CURRENT;
$config['cache_lifetime']   = 3600; // seconds
$config['force_compile']    = FALSE;
$config['compile_check']    = FALSE;
$config['error_unassigned'] = FALSE;
$config['error_reporting']  = null;
$config['debugging']        = FALSE;
*/
