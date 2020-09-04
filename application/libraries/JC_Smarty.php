<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Smarty support for CodeIgniter
 *
 * @category  Libraries
 * @author    Jacek Ciach
 */
//require_once APPPATH . "third_party/smarty-3.1.35/libs/Smarty.class.php";
class JC_Smarty extends Smarty
{
  const CI_CONFIG = 'smarty';

  protected $CI;

  public function __construct()
  {
    parent::__construct();
    $this->CI = get_instance();

    $this->configure();
  }

  protected function configure()
  {
    $this->CI->config->load(self::CI_CONFIG, true);
    $config = $this->CI->config->item(self::CI_CONFIG);

    $this->setConfigValue($config, 'caching');
    $this->setConfigValue($config, 'cache_lifetime');
    $this->setConfigValue($config, 'force_compile');
    $this->setConfigValue($config, 'compile_check');
    $this->setConfigValue($config, 'debugging');
    $this->setConfigValue($config, 'error_unassigned');
    $this->setConfigValue($config, 'error_reporting');

    if (isset($config['CacheDir']))    $this->setCacheDir   ($config['CacheDir']);    else throw new SmartyException('CacheDir is not set');
    if (isset($config['CompileDir']))  $this->setCompileDir ($config['CompileDir']);  else throw new SmartyException('CompileDir is not set');
    if (isset($config['ConfigDir']))   $this->setConfigDir  ($config['ConfigDir']);   else throw new SmartyException('ConfigDir is not set');
    if (isset($config['TemplateDir'])) $this->setTemplateDir($config['TemplateDir']); else throw new SmartyException('TemplateDir is not set');
  }

  private function setConfigValue($config, $key)
  {
    if (isset($config[$key]))
      $this->{$key} = $config[$key];
  }

  /**************************************************************************************************************************************************/

  public function display($template = null, $cache_id = null, $compile_id = null, $parent = null)
  {
    // we want Smarty::display() to output content with CI Output class, not with plain echo
    $this->CI->output->append_output(
      $this->fetch($template, $cache_id, $compile_id, $parent, false)
    );
  }

}
