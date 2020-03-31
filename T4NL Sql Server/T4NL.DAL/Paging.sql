﻿alter Procedure [dbo].[SplitPage] 
 @TableName varchar(50),        --表名
 @Fields varchar(1000) = '*',    --字段名(全部字段为*)
 @OrderField varchar(1000),        --排序字段(必须!支持多字段)
 @OrderType varchar(50),
 @sqlWhere varchar(1000) = Null,--条件语句(不用加where)
 @pageSize int,                    --每页多少条记录
 @pageIndex int = 1 ,            --指定当前为第几页
 @TotalPage int output            --返回总页数
as
begin

    Begin Tran --开始事务

    Declare @sql nvarchar(4000);
    Declare @totalRecord int;    

    --计算总记录数
         
    if (@SqlWhere='' or @sqlWhere=NULL)
        set @sql = 'select @totalRecord = count(*) from ' + @TableName
    else
        set @sql = 'select @totalRecord = count(*) from ' + @TableName + ' where ' + @sqlWhere

    EXEC sp_executesql @sql,N'@totalRecord int OUTPUT',@totalRecord OUTPUT--计算总记录数       
    
    --计算总数量
    select @TotalPage=@totalRecord--CEILING((@totalRecord+0.0)/@PageSize)+1

    if (@SqlWhere='' or @sqlWhere=NULL)
        set @sql = 'Select * FROM (select ROW_NUMBER() Over(order by ' + @OrderField + ' '+@OrderType+') as rowId,' + @Fields + ' from ' + @TableName 
    else
        set @sql = 'Select * FROM (select ROW_NUMBER() Over(order by ' + @OrderField + ' '+@OrderType+') as rowId,' + @Fields + ' from ' + @TableName + ' where ' + @SqlWhere    
        
    
    --处理页数超出范围情况
    if @PageIndex<=0 
        Set @pageIndex = 1
    
    if @pageIndex>@TotalPage
        Set @pageIndex = @TotalPage

     --处理开始点和结束点
    Declare @StartRecord int
    Declare @EndRecord int
    
    set @StartRecord = (@pageIndex-1)*@PageSize + 1
    set @EndRecord = @StartRecord + @pageSize - 1

    --继续合成sql语句
    set @Sql = @Sql + ') as ' + @TableName + ' where rowId between ' + Convert(varchar(50),@StartRecord) + ' and ' +  Convert(varchar(50),@EndRecord)
    --print @Sql
    Exec(@Sql)

--    print @totalRecord 
    If @@Error <> 0
      Begin
        RollBack Tran
        Return -1
      End
     Else
      Begin
        Commit Tran
        --print @totalRecord 
        Return @totalRecord ---返回记录总数
        
      End   
    
end



--执行调试
declare @STime nvarchar(40),@ETime nvarchar(40),@sqlwh nvarchar(255);
set @STime='1971-01-01 00:00:00';

set @ETime='2019-01-17 13:49:42';

set @sqlwh=' LogDate>= '+@STime+'AND LogDate<'+@ETime

declare @tg int

exec SplitPage 'LogInfo','*','Logger','desc','',10,0,@tg output 

print @tg