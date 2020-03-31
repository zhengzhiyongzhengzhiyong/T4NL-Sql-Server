using System.Web;
using System.Web.Optimization;

namespace T4NL.Web
{
    public class BundleConfig
    {

        public static void RegisterBundles(BundleCollection bundles)
        {
            //Basic start
            bundles.Add(new ScriptBundle("~/bundles/MainlyScripts").Include(
                        "~/js/libs/jquery-3.2.1.min.js",
                        "~/js/libs/jquery.fullscreen.js",
                        "~/js/libs/jquery-ui.min.js",
                        "~/js/app.config.js",
                        "~/js/plugins/metisMenu/jquery.metisMenu.js",
                        "~/js/plugin/jquery-touch/jquery.ui.touch-punch.min.js",
                        "~/js/bootstrap/bootstrap.min.js",
                        "~/js/notification/SmartNotification.min.js",
                        "~/js/smartwidgets/jarvis.widget.min.js",
                        "~/js/plugin/easy-pie-chart/jquery.easy-pie-chart.min.js",
                        "~/js/plugin/sparkline/jquery.sparkline.min.js",
                        "~/js/plugin/jquery-validate/jquery.validate.min.js",
                        "~/js/plugin/masked-input/jquery.maskedinput.min.js",
                        "~/js/plugin/select2/select2.min.js",
                        "~/js/plugin/bootstrap-slider/bootstrap-slider.min.js",
                        "~/js/plugin/msie-fix/jquery.mb.browser.min.js",
                        "~/js/plugin/fastclick/fastclick.min.js",
                        "~/js/demo.min.js",
                        "~/js/app.min.js",
                        "~/js/speech/voicecommand.min.js",
                        "~/js/smart-chat-ui/smart.chat.ui.min.js",
                        "~/js/smart-chat-ui/smart.chat.manager.min.js",
                        "~/js/Common.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/css/bootstrap.min.css",
                      "~/css/font-awesome.min.css",
                      "~/css/smartadmin-production-plugins.min.css",
                      "~/css/smartadmin-production.min.css",
                      "~/css/smartadmin-skins.min.css",
                      "~/css/smartadmin-rtl.min.css",
                      "~/css/demo.min.css",
                      "~/css/Site.css"));
            //Base End

            //bootstrap-table Start 
            bundles.Add(new ScriptBundle("~/bundles/BootstrapTable").Include(
                      "~/js/bootstrap-table/bootstrap-table.min.js",
                      "~/js/bootstrap-table/bootstrap-table-locale-all.min.js",
                      "~/js/bootstrap-table/extensions/export/jquery.base64.js",
                      "~/js/bootstrap-table/extensions/export/pdfmake.min.js",
                      "~/js/bootstrap-table/extensions/export/vfs_fonts.js",
                      //"~/js/bootstrap-table/extensions/export/jspdf.js",
                     // "~/js/bootstrap-table/extensions/export/jspdf.plugin.autotable.min.js",
                      "~/js/bootstrap-table/extensions/export/tableExport.js",
                      "~/js/bootstrap-table/extensions/export/bootstrap-table-export.min.js",
                      "~/js/bootstrap-table/extensions/editable/bootstrap-table-editable.min.js",
                      "~/js/bootstrap-table/extensions/editable/bootstrap-editable.js",
                      "~/js/bootstrap-table/extensions/toolbar/bootstrap-table-toolbar.min.js",
                      "~/js/bootstrap-table/extensions/print/bootstrap-table-print.min.js",
                      "~/js/bootstrap-table/extensions/mobile/bootstrap-table-mobile.min.js"));

            bundles.Add(new StyleBundle("~/Content/BootstrapTable").Include(
                      "~/js/bootstrap-table/bootstrap-table.min.css",
                      "~/js/bootstrap-table/bootstrap-editable.css"));
            //bootstrap-table End

            //Date range picker
            bundles.Add(new ScriptBundle("~/bundles/daterangepicker").Include(
                      "~/js/daterangepicker/moment.min.js",
                      "~/js/daterangepicker/daterangepicker.js"));
            bundles.Add(new StyleBundle("~/Content/daterangepicker").Include(
                      "~/js/daterangepicker/daterangepicker.css"));
            //end


            BundleTable.EnableOptimizations = false;


        }
    }
}
