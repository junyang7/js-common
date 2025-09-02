import Sql from "../src/Sql.js";

{
    let a = "CREATE TABLE `orders` (\n" +
        "  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,\n" +
        "  `order_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '主订单号',\n" +
        "  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '有效性，0无效，1有效',\n" +
        "  `addtime` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '订单新建时间',\n" +
        "  `modtime` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' ON UPDATE CURRENT_TIMESTAMP COMMENT '订单修改时间',\n" +
        "  `deltime` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '订单删除时间',\n" +
        "  `expire_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '订单失效时间',\n" +
        "  `pay_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '订单支付时间',\n" +
        "  `delivery_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '订单发货时间',\n" +
        "  `cancel_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '订单取消时间',\n" +
        "  `finish_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '订单完成时间',\n" +
        "  `close_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '订单关闭时间',\n" +
        "  `is_cross_border` enum('Y','N') NOT NULL DEFAULT 'N' COMMENT '订单是否包含跨境商品，Y是，N否，默认N',\n" +
        "  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '买家联系人姓名',\n" +
        "  `phone` varchar(255) NOT NULL DEFAULT '' COMMENT '买家联系人手机号码',\n" +
        "  `region` varchar(255) NOT NULL DEFAULT '' COMMENT '买家收货地址区域',\n" +
        "  `address` varchar(255) NOT NULL DEFAULT '' COMMENT '买家收货详细地址',\n" +
        "  `real_name` varchar(255) NOT NULL DEFAULT '' COMMENT '买家收货人真实姓名（跨境用）',\n" +
        "  `id_card` varchar(255) NOT NULL DEFAULT '' COMMENT '买家收货人真实身份证号码（跨境用）',\n" +
        "  `price` decimal(15,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '订单计算商品总金额 -- 不含运费',\n" +
        "  `prepay_price` decimal(15,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '订单预支付金额',\n" +
        "  `sku_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '订单总sku数量',\n" +
        "  `express_cost` decimal(15,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '订单计算运费金额',\n" +
        "  `pay_balance_type` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '额度支付类型，1无，2微博额度，3巨鲸帮帮额度',\n" +
        "  `pay_balance` decimal(15,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '使用的授信额度',\n" +
        "  `pay_grant_balance` decimal(15,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '使用的赠送额度',\n" +
        "  `source` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '订单来源：1.管理后台巨鲸帮帮;2.管理后台微博小店;3.达人Andorid应用端;4.达人iOS应用端;5.达人微博轻应用端;6.粉丝微信小程序端;',\n" +
        "  `state_code` int(4) unsigned NOT NULL DEFAULT '1001',\n" +
        "  `pay_price` decimal(15,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '订单实付商品总金额',\n" +
        "  `pay_type` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '第三方支付类型：1.无平台;2.余额支付;3.微信APP支付;4.支付宝APP支付;5.微博支付;',\n" +
        "  `pay_state` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '支付状态：1.未支付;2.支付成功;3.支付失败;',\n" +
        "  `payment_platform_order` varchar(255) NOT NULL DEFAULT '' COMMENT '支付平台生成订单',\n" +
        "  `return_url` varchar(500) NOT NULL DEFAULT '' COMMENT '支付回调地址（微博专用）',\n" +
        "  `is_pay_success_callback_pushed` enum('N','Y') NOT NULL DEFAULT 'N' COMMENT '支付成功回调通知消息是否已经添加到任务，N否，Y是，默认N',\n" +
        "  `cps_fee` decimal(15,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '主订单总佣金金额',\n" +
        "  `income` decimal(15,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '主订单总收益金额',\n" +
        "  `order_total_pay_price` decimal(15,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '订单实付总金额',\n" +
        "  `order_total_price` decimal(15,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '订单计算总金额',\n" +
        "  `buyer_id` bigint(11) unsigned NOT NULL DEFAULT '0' COMMENT '买家ID',\n" +
        "  `seller_id` bigint(11) unsigned NOT NULL DEFAULT '0' COMMENT '卖家ID',\n" +
        "  `shop_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '店铺ID',\n" +
        "  `shop_type` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '店铺类型：1.达人店铺;2.零售商店铺',\n" +
        "  `type` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '订单类型（标记）：1.样品订单;2.销售订单;3.闪购定向订单;4.商家日常订单;5.商家全量闪购订单;6.0元购订单;',\n" +
        "  `type_filter` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '订单类型（分组）：1.达人店铺订单;2.商家店铺订单;3.样品订单',\n" +
        "  `exceptional_case` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '例外情况标记：0.无；1.订单支付前的状态是已取消（实际没有扣减库存）；',\n" +
        "  `seller_weibo_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '卖家微博ID',\n" +
        "  `buyer_weibo_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '买家微博ID',\n" +
        "  `remarks` varchar(255) NOT NULL DEFAULT '' COMMENT '订单备注',\n" +
        "  `merchant_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '供应商ID：主订单下最后一个子订单所属供应商的ID（非供应商订单固定为默认值0）',\n" +
        "  `coupon_amount` decimal(15,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '主订单商品优惠金额',\n" +
        "  `hbfq_num` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '花呗分期期数',\n" +
        "  `has_comment` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否评论',\n" +
        "  `comment_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '评论时间',\n" +
        "  `is_encrypted` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否已加密：0未加密；1已加密',\n" +
        "  `contact_phone` varchar(255) NOT NULL DEFAULT '' COMMENT '联系人手机号码',\n" +
        "  `change_price` decimal(15,2) NOT NULL DEFAULT '0.00' COMMENT '主单更改金额',\n" +
        "  `total_origin_price` decimal(15,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '商品原价总价',\n" +
        "  `activity_reduce` decimal(15,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '活动优惠总金额',\n" +
        "  `shop_reduce` decimal(15,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '商家优惠总金额',\n" +
        "  `platform_reduce` decimal(15,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '平台优惠总金额',\n" +
        "  `is_merge` tinyint(2) unsigned NOT NULL DEFAULT '2' COMMENT '是否合单支付:1.是;2否',\n" +
        "  `ip` varchar(100) NOT NULL DEFAULT '' COMMENT '下单用户IP',\n" +
        "  `buyer_weibo_name` varchar(255) NOT NULL DEFAULT '' COMMENT '买家微博昵称',\n" +
        "  `anchor_reduce` decimal(15,2) NOT NULL DEFAULT '0.00' COMMENT '达人承担金额',\n" +
        "  `change_express_cost_price` decimal(15,2) NOT NULL DEFAULT '0.00' COMMENT '商家修改运费的差值',\n" +
        "  PRIMARY KEY (`id`) USING BTREE,\n" +
        "  UNIQUE KEY `uk_order_id` (`order_id`) USING BTREE,\n" +
        "  KEY `idx_buyer_id` (`buyer_id`) USING BTREE,\n" +
        "  KEY `idx_seller_id` (`seller_id`) USING BTREE,\n" +
        "  KEY `idx_buyer_weibo_id` (`buyer_weibo_id`),\n" +
        "  KEY `idx_expire_time` (`expire_time`),\n" +
        "  KEY `idx_s_code` (`state_code`),\n" +
        "  KEY `idx_modtime` (`modtime`)\n" +
        ") ENGINE=InnoDB AUTO_INCREMENT=30033510 DEFAULT CHARSET=utf8mb4 COMMENT='主订单表';";
    // let b = Sql.parseShowCreateTable(a);
    // console.log(b);
}
{
    let a = {
        "state": 1,
        "name": "id1",
        "type": "BIGINT",
        "parameter_type": "number",
        "parameter_list": [
            20
        ],
        "unsigned": true,
        "not_null": true,
        "auto_increment": true,
        "on_update_current_timestamp": false,
        "comment": ""
    };
    // let b = Sql.buildColumnSql(a);
    // console.log(b);
}
{
    let a = {
        "name": {
            "old": "orders1",
            "new": "orders2"
        },
        "column_list": [
            {
                "old": {
                    "state": 1,
                    "name": "id1",
                    "type": "BIGINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        20
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": true,
                    "on_update_current_timestamp": false,
                    "comment": ""
                },
                "new": {
                    "state": 0,
                    "name": "id2",
                    "type": "BIGINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        20
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": true,
                    "on_update_current_timestamp": false,
                    "comment": ""
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "order_id",
                    "type": "BIGINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        20
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "主订单号",
                    "default": "0"
                },
                "new": {
                    "state": 1,
                    "name": "order_id",
                    "type": "BIGINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        20
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "主订单号",
                    "default": "0"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "status",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "有效性，0无效，1有效",
                    "default": "1"
                },
                "new": {
                    "state": 1,
                    "name": "status",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "有效性，0无效，1有效",
                    "default": "1"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "addtime",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单新建时间",
                    "default": "1970-01-01 00:00:00"
                },
                "new": {
                    "state": 1,
                    "name": "addtime",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单新建时间",
                    "default": "1970-01-01 00:00:00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "modtime",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": true,
                    "comment": "订单修改时间",
                    "default": "1970-01-01 00:00:00"
                },
                "new": {
                    "state": 1,
                    "name": "modtime",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": true,
                    "comment": "订单修改时间",
                    "default": "1970-01-01 00:00:00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "deltime",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单删除时间",
                    "default": "1970-01-01 00:00:00"
                },
                "new": {
                    "state": 1,
                    "name": "deltime",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单删除时间",
                    "default": "1970-01-01 00:00:00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "expire_time",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单失效时间",
                    "default": "1970-01-01 00:00:00"
                },
                "new": {
                    "state": 1,
                    "name": "expire_time",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单失效时间",
                    "default": "1970-01-01 00:00:00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "pay_time",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单支付时间",
                    "default": "1970-01-01 00:00:00"
                },
                "new": {
                    "state": 1,
                    "name": "pay_time",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单支付时间",
                    "default": "1970-01-01 00:00:00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "delivery_time",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单发货时间",
                    "default": "1970-01-01 00:00:00"
                },
                "new": {
                    "state": 1,
                    "name": "delivery_time",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单发货时间",
                    "default": "1970-01-01 00:00:00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "cancel_time",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单取消时间",
                    "default": "1970-01-01 00:00:00"
                },
                "new": {
                    "state": 1,
                    "name": "cancel_time",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单取消时间",
                    "default": "1970-01-01 00:00:00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "finish_time",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单完成时间",
                    "default": "1970-01-01 00:00:00"
                },
                "new": {
                    "state": 1,
                    "name": "finish_time",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单完成时间",
                    "default": "1970-01-01 00:00:00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "close_time",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单关闭时间",
                    "default": "1970-01-01 00:00:00"
                },
                "new": {
                    "state": 1,
                    "name": "close_time",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单关闭时间",
                    "default": "1970-01-01 00:00:00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "is_cross_border",
                    "type": "ENUM",
                    "parameter_type": "string",
                    "parameter_list": [
                        "Y",
                        "N"
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单是否包含跨境商品，Y是，N否，默认N",
                    "default": "N"
                },
                "new": {
                    "state": 1,
                    "name": "is_cross_border",
                    "type": "ENUM",
                    "parameter_type": "string",
                    "parameter_list": [
                        "Y",
                        "N"
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单是否包含跨境商品，Y是，N否，默认N",
                    "default": "N"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "name",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        255
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "买家联系人姓名",
                    "default": ""
                },
                "new": {
                    "state": 1,
                    "name": "name",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        255
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "买家联系人姓名",
                    "default": ""
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "phone",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        255
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "买家联系人手机号码",
                    "default": ""
                },
                "new": {
                    "state": 1,
                    "name": "phone",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        255
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "买家联系人手机号码",
                    "default": ""
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "region",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        255
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "买家收货地址区域",
                    "default": ""
                },
                "new": {
                    "state": 1,
                    "name": "region",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        255
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "买家收货地址区域",
                    "default": ""
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "address",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        255
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "买家收货详细地址",
                    "default": ""
                },
                "new": {
                    "state": 1,
                    "name": "address",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        255
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "买家收货详细地址",
                    "default": ""
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "real_name",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        255
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "买家收货人真实姓名（跨境用）",
                    "default": ""
                },
                "new": {
                    "state": 1,
                    "name": "real_name",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        255
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "买家收货人真实姓名（跨境用）",
                    "default": ""
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "id_card",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        255
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "买家收货人真实身份证号码（跨境用）",
                    "default": ""
                },
                "new": {
                    "state": 1,
                    "name": "id_card",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        255
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "买家收货人真实身份证号码（跨境用）",
                    "default": ""
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "price",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单计算商品总金额 -- 不含运费",
                    "default": "0.00"
                },
                "new": {
                    "state": 1,
                    "name": "price",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单计算商品总金额 -- 不含运费",
                    "default": "0.00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "prepay_price",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单预支付金额",
                    "default": "0.00"
                },
                "new": {
                    "state": 1,
                    "name": "prepay_price",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单预支付金额",
                    "default": "0.00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "sku_count",
                    "type": "INT",
                    "parameter_type": "number",
                    "parameter_list": [
                        10
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单总sku数量",
                    "default": "0"
                },
                "new": {
                    "state": 1,
                    "name": "sku_count",
                    "type": "INT",
                    "parameter_type": "number",
                    "parameter_list": [
                        10
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单总sku数量",
                    "default": "0"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "express_cost",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单计算运费金额",
                    "default": "0.00"
                },
                "new": {
                    "state": 1,
                    "name": "express_cost",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单计算运费金额",
                    "default": "0.00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "pay_balance_type",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "额度支付类型，1无，2微博额度，3巨鲸帮帮额度",
                    "default": "1"
                },
                "new": {
                    "state": 1,
                    "name": "pay_balance_type",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "额度支付类型，1无，2微博额度，3巨鲸帮帮额度",
                    "default": "1"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "pay_balance",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "使用的授信额度",
                    "default": "0.00"
                },
                "new": {
                    "state": 1,
                    "name": "pay_balance",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "使用的授信额度",
                    "default": "0.00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "pay_grant_balance",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "使用的赠送额度",
                    "default": "0.00"
                },
                "new": {
                    "state": 1,
                    "name": "pay_grant_balance",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "使用的赠送额度",
                    "default": "0.00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "source",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单来源：1.管理后台巨鲸帮帮;2.管理后台微博小店;3.达人Andorid应用端;4.达人iOS应用端;5.达人微博轻应用端;6.粉丝微信小程序端;",
                    "default": "0"
                },
                "new": {
                    "state": 1,
                    "name": "source",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单来源：1.管理后台巨鲸帮帮;2.管理后台微博小店;3.达人Andorid应用端;4.达人iOS应用端;5.达人微博轻应用端;6.粉丝微信小程序端;",
                    "default": "0"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "state_code",
                    "type": "INT",
                    "parameter_type": "number",
                    "parameter_list": [
                        4
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "",
                    "default": "1001"
                },
                "new": {
                    "state": 1,
                    "name": "state_code",
                    "type": "INT",
                    "parameter_type": "number",
                    "parameter_list": [
                        4
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "",
                    "default": "1001"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "pay_price",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单实付商品总金额",
                    "default": "0.00"
                },
                "new": {
                    "state": 1,
                    "name": "pay_price",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单实付商品总金额",
                    "default": "0.00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "pay_type",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "第三方支付类型：1.无平台;2.余额支付;3.微信APP支付;4.支付宝APP支付;5.微博支付;",
                    "default": "0"
                },
                "new": {
                    "state": 1,
                    "name": "pay_type",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "第三方支付类型：1.无平台;2.余额支付;3.微信APP支付;4.支付宝APP支付;5.微博支付;",
                    "default": "0"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "pay_state",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "支付状态：1.未支付;2.支付成功;3.支付失败;",
                    "default": "1"
                },
                "new": {
                    "state": 1,
                    "name": "pay_state",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "支付状态：1.未支付;2.支付成功;3.支付失败;",
                    "default": "1"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "payment_platform_order",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        255
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "支付平台生成订单",
                    "default": ""
                },
                "new": {
                    "state": 1,
                    "name": "payment_platform_order",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        255
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "支付平台生成订单",
                    "default": ""
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "return_url",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        500
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "支付回调地址（微博专用）",
                    "default": ""
                },
                "new": {
                    "state": 1,
                    "name": "return_url",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        500
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "支付回调地址（微博专用）",
                    "default": ""
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "is_pay_success_callback_pushed",
                    "type": "ENUM",
                    "parameter_type": "string",
                    "parameter_list": [
                        "N",
                        "Y"
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "支付成功回调通知消息是否已经添加到任务，N否，Y是，默认N",
                    "default": "N"
                },
                "new": {
                    "state": 1,
                    "name": "is_pay_success_callback_pushed",
                    "type": "ENUM",
                    "parameter_type": "string",
                    "parameter_list": [
                        "N",
                        "Y"
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "支付成功回调通知消息是否已经添加到任务，N否，Y是，默认N",
                    "default": "N"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "cps_fee",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "主订单总佣金金额",
                    "default": "0.00"
                },
                "new": {
                    "state": 1,
                    "name": "cps_fee",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "主订单总佣金金额",
                    "default": "0.00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "income",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "主订单总收益金额",
                    "default": "0.00"
                },
                "new": {
                    "state": 1,
                    "name": "income",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "主订单总收益金额",
                    "default": "0.00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "order_total_pay_price",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单实付总金额",
                    "default": "0.00"
                },
                "new": {
                    "state": 1,
                    "name": "order_total_pay_price",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单实付总金额",
                    "default": "0.00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "order_total_price",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单计算总金额",
                    "default": "0.00"
                },
                "new": {
                    "state": 1,
                    "name": "order_total_price",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单计算总金额",
                    "default": "0.00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "buyer_id",
                    "type": "BIGINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        11
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "买家ID",
                    "default": "0"
                },
                "new": {
                    "state": 1,
                    "name": "buyer_id",
                    "type": "BIGINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        11
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "买家ID",
                    "default": "0"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "seller_id",
                    "type": "BIGINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        11
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "卖家ID",
                    "default": "0"
                },
                "new": {
                    "state": 1,
                    "name": "seller_id",
                    "type": "BIGINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        11
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "卖家ID",
                    "default": "0"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "shop_id",
                    "type": "INT",
                    "parameter_type": "number",
                    "parameter_list": [
                        11
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "店铺ID",
                    "default": "0"
                },
                "new": {
                    "state": 1,
                    "name": "shop_id",
                    "type": "INT",
                    "parameter_type": "number",
                    "parameter_list": [
                        11
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "店铺ID",
                    "default": "0"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "shop_type",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "店铺类型：1.达人店铺;2.零售商店铺",
                    "default": "1"
                },
                "new": {
                    "state": 1,
                    "name": "shop_type",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "店铺类型：1.达人店铺;2.零售商店铺",
                    "default": "1"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "type",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单类型（标记）：1.样品订单;2.销售订单;3.闪购定向订单;4.商家日常订单;5.商家全量闪购订单;6.0元购订单;",
                    "default": "0"
                },
                "new": {
                    "state": 1,
                    "name": "type",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单类型（标记）：1.样品订单;2.销售订单;3.闪购定向订单;4.商家日常订单;5.商家全量闪购订单;6.0元购订单;",
                    "default": "0"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "type_filter",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单类型（分组）：1.达人店铺订单;2.商家店铺订单;3.样品订单",
                    "default": "0"
                },
                "new": {
                    "state": 1,
                    "name": "type_filter",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单类型（分组）：1.达人店铺订单;2.商家店铺订单;3.样品订单",
                    "default": "0"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "exceptional_case",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "例外情况标记：0.无；1.订单支付前的状态是已取消（实际没有扣减库存）；",
                    "default": "0"
                },
                "new": {
                    "state": 1,
                    "name": "exceptional_case",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "例外情况标记：0.无；1.订单支付前的状态是已取消（实际没有扣减库存）；",
                    "default": "0"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "seller_weibo_id",
                    "type": "BIGINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        20
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "卖家微博ID",
                    "default": "0"
                },
                "new": {
                    "state": 1,
                    "name": "seller_weibo_id",
                    "type": "BIGINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        20
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "卖家微博ID",
                    "default": "0"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "buyer_weibo_id",
                    "type": "BIGINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        20
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "买家微博ID",
                    "default": "0"
                },
                "new": {
                    "state": 1,
                    "name": "buyer_weibo_id",
                    "type": "BIGINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        20
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "买家微博ID",
                    "default": "0"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "remarks",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        255
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单备注",
                    "default": ""
                },
                "new": {
                    "state": 1,
                    "name": "remarks",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        255
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单备注",
                    "default": ""
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "merchant_id",
                    "type": "INT",
                    "parameter_type": "number",
                    "parameter_list": [
                        11
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "供应商ID：主订单下最后一个子订单所属供应商的ID（非供应商订单固定为默认值0）",
                    "default": "0"
                },
                "new": {
                    "state": 1,
                    "name": "merchant_id",
                    "type": "INT",
                    "parameter_type": "number",
                    "parameter_list": [
                        11
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "供应商ID：主订单下最后一个子订单所属供应商的ID（非供应商订单固定为默认值0）",
                    "default": "0"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "coupon_amount",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "主订单商品优惠金额",
                    "default": "0.00"
                },
                "new": {
                    "state": 1,
                    "name": "coupon_amount",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "主订单商品优惠金额",
                    "default": "0.00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "hbfq_num",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "花呗分期期数",
                    "default": "0"
                },
                "new": {
                    "state": 1,
                    "name": "hbfq_num",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "花呗分期期数",
                    "default": "0"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "has_comment",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "是否评论",
                    "default": "0"
                },
                "new": {
                    "state": 1,
                    "name": "has_comment",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "是否评论",
                    "default": "0"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "comment_time",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "评论时间",
                    "default": "1970-01-01 00:00:00"
                },
                "new": {
                    "state": 1,
                    "name": "comment_time",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "评论时间",
                    "default": "1970-01-01 00:00:00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "is_encrypted",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "是否已加密：0未加密；1已加密",
                    "default": "0"
                },
                "new": {
                    "state": 1,
                    "name": "is_encrypted",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "是否已加密：0未加密；1已加密",
                    "default": "0"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "contact_phone",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        255
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "联系人手机号码",
                    "default": ""
                },
                "new": {
                    "state": 1,
                    "name": "contact_phone",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        255
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "联系人手机号码",
                    "default": ""
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "change_price",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "主单更改金额",
                    "default": "0.00"
                },
                "new": {
                    "state": 1,
                    "name": "change_price",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "主单更改金额",
                    "default": "0.00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "total_origin_price",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "商品原价总价",
                    "default": "0.00"
                },
                "new": {
                    "state": 1,
                    "name": "total_origin_price",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "商品原价总价",
                    "default": "0.00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "activity_reduce",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "活动优惠总金额",
                    "default": "0.00"
                },
                "new": {
                    "state": 1,
                    "name": "activity_reduce",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "活动优惠总金额",
                    "default": "0.00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "shop_reduce",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "商家优惠总金额",
                    "default": "0.00"
                },
                "new": {
                    "state": 1,
                    "name": "shop_reduce",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "商家优惠总金额",
                    "default": "0.00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "platform_reduce",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "平台优惠总金额",
                    "default": "0.00"
                },
                "new": {
                    "state": 1,
                    "name": "platform_reduce",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "平台优惠总金额",
                    "default": "0.00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "is_merge",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "是否合单支付:1.是;2否",
                    "default": "2"
                },
                "new": {
                    "state": 1,
                    "name": "is_merge",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        2
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "是否合单支付:1.是;2否",
                    "default": "2"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "ip",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        100
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "下单用户IP",
                    "default": ""
                },
                "new": {
                    "state": 1,
                    "name": "ip",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        100
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "下单用户IP",
                    "default": ""
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "buyer_weibo_name",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        255
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "买家微博昵称",
                    "default": ""
                },
                "new": {
                    "state": 1,
                    "name": "buyer_weibo_name",
                    "type": "VARCHAR",
                    "parameter_type": "number",
                    "parameter_list": [
                        255
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "买家微博昵称",
                    "default": ""
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "anchor_reduce",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "达人承担金额",
                    "default": "0.00"
                },
                "new": {
                    "state": 1,
                    "name": "anchor_reduce",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "达人承担金额",
                    "default": "0.00"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "change_express_cost_price",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "商家修改运费的差值",
                    "default": "0.00"
                },
                "new": {
                    "state": 1,
                    "name": "change_express_cost_price",
                    "type": "DECIMAL",
                    "parameter_type": "number",
                    "parameter_list": [
                        15,
                        2
                    ],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "商家修改运费的差值",
                    "default": "0.00"
                }
            }
        ],
        "index_list": [
            {
                "old": {
                    "state": 1,
                    "type": "PRIMARY",
                    "name": "",
                    "column_list": [
                        "id"
                    ]
                },
                "new": {
                    "state": 1,
                    "type": "PRIMARY",
                    "name": "",
                    "column_list": [
                        "id"
                    ]
                }
            },
            {
                "old": {
                    "state": 1,
                    "type": "UNIQUE",
                    "name": "uk_order_id",
                    "column_list": [
                        "order_id"
                    ]
                },
                "new": {
                    "state": 1,
                    "type": "UNIQUE",
                    "name": "uk_order_id",
                    "column_list": [
                        "order_id"
                    ]
                }
            },
            {
                "old": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_buyer_id",
                    "column_list": [
                        "buyer_id"
                    ]
                },
                "new": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_buyer_id",
                    "column_list": [
                        "buyer_id"
                    ]
                }
            },
            {
                "old": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_seller_id",
                    "column_list": [
                        "seller_id"
                    ]
                },
                "new": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_seller_id",
                    "column_list": [
                        "seller_id"
                    ]
                }
            },
            {
                "old": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_buyer_weibo_id",
                    "column_list": [
                        "buyer_weibo_id"
                    ]
                },
                "new": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_buyer_weibo_id",
                    "column_list": [
                        "buyer_weibo_id"
                    ]
                }
            },
            {
                "old": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_expire_time",
                    "column_list": [
                        "expire_time"
                    ]
                },
                "new": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_expire_time",
                    "column_list": [
                        "expire_time"
                    ]
                }
            },
            {
                "old": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_s_code",
                    "column_list": [
                        "state_code"
                    ]
                },
                "new": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_s_code",
                    "column_list": [
                        "state_code"
                    ]
                }
            },
            {
                "old": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_modtime",
                    "column_list": [
                        "modtime"
                    ]
                },
                "new": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_modtime",
                    "column_list": [
                        "modtime"
                    ]
                }
            }
        ],
        "engine": {
            "old": "InnoDB",
            "new": "InnoDB"
        },
        "auto_increment": {
            "old": 30033510,
            "new": 30033510
        },
        "default_charset": {
            "old": "utf8mb4",
            "new": "utf8mb4"
        },
        "comment": {
            "old": "主订单表",
            "new": "主订单表"
        }
    }
    // let b = Sql.buildShowCreateTable(a);
    // console.log(b);
}
{
    let a = {
        "state": 1,
        "type": "KEY",
        "name": "idx_buyer_id",
        "column_list": [
            "buyer_id"
        ]
    };
    // let b = Sql.buildIndexSql(a);
    // console.log(b)
}
{
    let a = {
        "name": {
            "old": "orders",
            "new": "orders_n"
        },
        "column_list": [
            {
                "old": {
                    "state": 1,
                    "name": "id1",
                    "type": "BIGINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        20
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": true,
                    "on_update_current_timestamp": false,
                    "comment": ""
                },
                "new": {
                    "state": 0,
                    "name": "id2",
                    "type": "BIGINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        20
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": true,
                    "on_update_current_timestamp": false,
                    "comment": ""
                }
            },
            {
                "old": {
                    "state": 0,
                    "name": "order_id",
                    "type": "BIGINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        20
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "主订单号",
                    "default": "0"
                },
                "new": {
                    "state": 1,
                    "name": "order_id",
                    "type": "BIGINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        20
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "主订单号",
                    "default": "0"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "status",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "有效性，0无效，1有效",
                    "default": "1"
                },
                "new": {
                    "state": 1,
                    "name": "status",
                    "type": "TINYINT",
                    "parameter_type": "number",
                    "parameter_list": [
                        1
                    ],
                    "unsigned": true,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "有效性，0无效，1有效",
                    "default": "1"
                }
            },
            {
                "old": {
                    "state": 1,
                    "name": "addtime",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单新建时间",
                    "default": "1970-01-01 00:00:00"
                },
                "new": {
                    "state": 1,
                    "name": "addtime1",
                    "type": "DATETIME",
                    "parameter_type": "",
                    "parameter_list": [],
                    "unsigned": false,
                    "not_null": true,
                    "auto_increment": false,
                    "on_update_current_timestamp": false,
                    "comment": "订单新建时间",
                    "default": "1970-01-01 00:00:00"
                }
            },
        ],
        "index_list": [
            {
                "old": {
                    "state": 0,
                    "type": "PRIMARY",
                    "name": "",
                    "column_list": [
                        "id"
                    ]
                },
                "new": {
                    "state": 1,
                    "type": "PRIMARY",
                    "name": "",
                    "column_list": [
                        "id"
                    ]
                }
            },
            {
                "old": {
                    "state": 1,
                    "type": "UNIQUE",
                    "name": "uk_order_id1",
                    "column_list": [
                        "order_id"
                    ]
                },
                "new": {
                    "state": 1,
                    "type": "UNIQUE",
                    "name": "uk_order_id",
                    "column_list": [
                        "order_id"
                    ]
                }
            },
            {
                "old": {
                    "state": 0,
                    "type": "KEY",
                    "name": "idx_buyer_id",
                    "column_list": [
                        "buyer_id"
                    ]
                },
                "new": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_buyer_id",
                    "column_list": [
                        "buyer_id"
                    ]
                }
            },
            {
                "old": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_seller_id",
                    "column_list": [
                        "seller_id"
                    ]
                },
                "new": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_seller_id",
                    "column_list": [
                        "seller_id"
                    ]
                }
            },
            {
                "old": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_buyer_weibo_id",
                    "column_list": [
                        "buyer_weibo_id"
                    ]
                },
                "new": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_buyer_weibo_id",
                    "column_list": [
                        "buyer_weibo_id"
                    ]
                }
            },
            {
                "old": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_expire_time",
                    "column_list": [
                        "expire_time"
                    ]
                },
                "new": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_expire_time",
                    "column_list": [
                        "expire_time"
                    ]
                }
            },
            {
                "old": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_s_code",
                    "column_list": [
                        "state_code"
                    ]
                },
                "new": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_s_code",
                    "column_list": [
                        "state_code"
                    ]
                }
            },
            {
                "old": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_modtime",
                    "column_list": [
                        "modtime"
                    ]
                },
                "new": {
                    "state": 1,
                    "type": "KEY",
                    "name": "idx_modtime",
                    "column_list": [
                        "modtime"
                    ]
                }
            }
        ],
        "engine": {
            "old": "InnoDB",
            "new": "InnoDB_test"
        },
        "auto_increment": {
            "old": 1,
            "new": 30033510
        },
        "default_charset": {
            "old": "utf8",
            "new": "utf8mb4"
        },
        "comment": {
            "old": "",
            "new": "主订单表"
        }
    };
    let b = Sql.buildDiffSql(a);
    console.log(b);
}
