create table stock(
	id varchar(32) not null comment 'ID',
	stockCode varchar(6) not null comment '股票代码',
	track int(10) comment '是否跟踪',
	priority int(10) comment '排序',
	cts datetime comment '创建时间',
	uts datetime comment '修改时间',	
	primary key (id)
) engine=InnoDB default charset=utf8 collate=utf8_bin comment '股票表';