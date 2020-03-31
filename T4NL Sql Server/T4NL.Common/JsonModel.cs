using System.Web.Mvc;

namespace T4NL.Common
{
    public class JsonModel
    {
        /// <summary>
        /// 成功=OK ;失败=ERROR
        /// </summary>
        private readonly JsonParam _res;
        private readonly JsonResult _jsonResult;
        public JsonModel()
        {
            _res = new JsonParam();
            _jsonResult = new JsonResult() { JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public JsonResult Success()
        {
            _res.SetSuccess();
            _jsonResult.Data = _res;
            return _jsonResult;
        }
        public JsonResult Success(string msg)
        {
            _res.SetSuccess(msg);
            _jsonResult.Data = _res;
            return _jsonResult;
        }
        public JsonResult Success(object data)
        {
            _res.SetSuccess(data);
            _jsonResult.Data = _res;
            return _jsonResult;
        }
        public JsonResult Success(string msg, object data)
        {
            _res.SetSuccess(msg, data);
            _jsonResult.Data = _res;
            return _jsonResult;
        }
        public JsonResult Defeate()
        {
            return Defeate("操作失败");
        }
        public JsonResult Defeate(string msg)
        {
            _res.SetDefeate(msg);
            _jsonResult.Data = _res;
            return _jsonResult;
        }
        public JsonResult Exception()
        {
            return Defeate("服务器错误");
        }
        public JsonResult SetResult(JsonParam param)
        {
            if (param == null) return Defeate();
            _jsonResult.Data = param;
            return _jsonResult;
        }
    }


    public class JsonParam
    {
        /// <summary>
        /// 成功=OK ;失败=ERROR
        /// </summary>
        private string _status;

        private string _message;
        public string Message
        {
            get { return _message.Replace("'", "\\'"); }
            set { _message = value; }
        }

        public object Data { get; set; }
        public string Status { get { return _status.ToUpper(); } set { _status = value; } }

        ////public string Layer { get { return LayerMessage(); } }
        public bool IsSuccess { get => _isSuccess; }

        private bool _isSuccess;

        public JsonParam()
        {
            Status = "ERROR";
            _isSuccess = false;
        }

        public void SetDefeate()
        {
            SetDefeate("操作失败");
        }
        public void SetDefeate(string msg)
        {
            Message = msg;
            _isSuccess = false;
        }
        public void SetSuccess()
        {
            SetSuccess("操作成功", "");
        }

        public void SetSuccess(string msg)
        {
            SetSuccess(msg, "");
        }
        public void SetSuccess(object data)
        {
            SetSuccess("操作成功", data);
        }
        public void SetSuccess(string msg, object data)
        {
            Status = "OK";
            _isSuccess = true;
            Message = msg;
            Data = data;
        }

        //string LayerMessage()
        //{
        //    string p;
        //    if (Status == "OK")
        //    {
        //        p = "layui.use('layer', function () { var layer=layui.layer; layer.msg('" + Message + "', { icon: 0 } ); });";
        //    }
        //    else
        //    {
        //        p = "layui.use('layer', function () { var layer=layui.layer; layer.msg('" + Message + "', { icon: 2 } ); });";
        //    }

        //    return p;
        //}

    }

    /// <summary>
    /// 弹窗提示图标
    /// </summary>
    public enum LayerMsgIco
    {
        /// <summary>
        /// 警告
        /// </summary>
        Warn = 0,
        /// <summary>
        /// 成功
        /// </summary>
        Success = 1,
        /// <summary>
        /// 错误
        /// </summary>
        Error = 2,
        /// <summary>
        /// 询问
        /// </summary>
        Question = 3,
        /// <summary>
        /// 锁
        /// </summary>
        Lock = 4,
        /// <summary>
        /// 失败的表情
        /// </summary>
        ErrorFace = 5,
        /// <summary>
        /// 成功的表情
        /// </summary>
        SuccessFace = 6
    }
}
