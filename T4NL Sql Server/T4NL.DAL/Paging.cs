using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using T4NL.Common;

namespace T4NL.DAL
{
    public class Paging
    {

        /// <summary>
        /// 获取分页的数据
        /// </summary>
        /// <param name="TblName">数据表名</param>
        /// <param name="Fields">要读取的字段</param>
        /// <param name="OrderFiled">排序字段</param>
        /// <param name="OrderType">排序字段</param>
        /// <param name="SqlWhere">查询条件</param>
        /// <param name="PageSize">每页显示多少条数据</param>
        /// <param name="pageIndex">当前页码</param>
        /// <param name="TotalPage">返回值，共有多少页</param>
        public static SqlCommand PageData(string TableName, string Fields, string OrderFiled,string OrderType, string SqlWhere, int PageSize, int pageIndex)
        {
            try
            {

                string connString = BasicConfig.ConnectionString;

                SqlConnection conn = new SqlConnection(connString);
                SqlCommand comm = new SqlCommand("SplitPage", conn);

                comm.Parameters.Add(new SqlParameter("@TableName", SqlDbType.NVarChar, 100));
                comm.Parameters[0].Value = TableName;

                comm.Parameters.Add(new SqlParameter("@Fields", SqlDbType.NVarChar, 1000));
                comm.Parameters[1].Value = Fields;

                comm.Parameters.Add(new SqlParameter("@OrderField", SqlDbType.NVarChar, 1000));
                comm.Parameters[2].Value = OrderFiled;

                comm.Parameters.Add(new SqlParameter("@OrderType", SqlDbType.NVarChar, 1000));
                comm.Parameters[3].Value = OrderType;

                comm.Parameters.Add(new SqlParameter("@sqlWhere", SqlDbType.NVarChar, 1000));
                comm.Parameters[4].Value = SqlWhere;

                comm.Parameters.Add(new SqlParameter("@pageSize", SqlDbType.Int));
                comm.Parameters[5].Value = PageSize;

                comm.Parameters.Add(new SqlParameter("@pageIndex", SqlDbType.Int));
                comm.Parameters[6].Value = pageIndex;


                comm.Parameters.Add(new SqlParameter("@TotalPage", SqlDbType.Int));
                comm.Parameters[7].Direction = ParameterDirection.Output;


                conn.Open();
                comm.CommandType = CommandType.StoredProcedure;
               
                return comm;

            }
            catch (SqlException e)
            {
                throw e;
            }
        }
    }
}
