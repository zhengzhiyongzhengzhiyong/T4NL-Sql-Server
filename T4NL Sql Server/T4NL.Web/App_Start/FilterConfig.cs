using System.Web;
using System.Web.Mvc;

namespace T4NL.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }


    /// <summary>
    /// 检查登录
    /// </summary>
    public class CheckLoginFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            //var sessionId = HttpContext.Current.Request.Params[BaseConfig.SessionId];
            //var user = UserInfo.Get(sessionId);
            //filterContext.Controller.ViewBag.LoginUser = user == null ? string.Empty : user.UserName;
        }
    }

    /// <summary>
    /// 检查登录的用户信息，登录 或 没登录 都可以查看的页面
    /// </summary>
    public class CheckLoginInfoFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            //var sessionId = HttpContext.Current.Request.Params[BaseConfig.SessionId];
            //var user = UserInfo.Get(sessionId);
            //filterContext.Controller.ViewBag.LoginUser = user == null ? string.Empty : user.UserName;
        }
    }
}
