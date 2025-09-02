export default class Sql {

    static TYPE_LIST = [
        "TINYINT", "SMALLINT", "MEDIUMINT", "INT", "BIGINT",
        "FLOAT", "DOUBLE", "DECIMAL",
        "BIT",
        "DATE", "TIME", "DATETIME", "TIMESTAMP", "YEAR",
        "CHAR", "VARCHAR", "TINYTEXT", "TEXT", "MEDIUMTEXT", "LONGTEXT",
        "ENUM",
        "SET",
        "BINARY", "VARBINARY",
        "TINYBLOB", "BLOB", "MEDIUMBLOB", "LONGBLOB",
        "JSON",
        "GEOMETRY", "POINT", "LINESTRING", "POLYGON",
        "MULTIPOINT", "MULTILINESTRING", "MULTIPOLYGON", "GEOMETRYCOLLECTION",
    ];

    /**
     * 字段
     * @type {{new: {default: void, auto_increment: boolean, not_null: boolean, name: string, unsigned: boolean, comment: string, type: string, on_update_current_timestamp: boolean, parameter_type: string, parameter_list: []}, old: {default: void, auto_increment: boolean, not_null: boolean, name: string, unsigned: boolean, comment: string, type: string, on_update_current_timestamp: boolean, parameter_type: string, parameter_list: []}}}
     */
    static COLUMN = {
        old: {
            state: 1, // 1使用，0未使用
            name: "",
            type: "",
            parameter_type: "",
            parameter_list: [],
            unsigned: false,
            not_null: false,
            auto_increment: false,
            default: undefined,
            on_update_current_timestamp: false,
            comment: "",
        },
        new: {
            state: 1, // 1使用，0未使用
            name: "",
            type: "",
            parameter_type: "",
            parameter_list: [],
            unsigned: false,
            not_null: false,
            auto_increment: false,
            default: undefined,
            on_update_current_timestamp: false,
            comment: "",
        },
    }

    /**
     * 索引
     * @type {{new: {name: string, type: string, column_list: []}, old: {name: string, type: string, column_list: []}}}
     */
    static INDEX = {
        old: {
            state: 1, // 1使用，0未使用
            type: "",
            name: "",
            column_list: [],
        },
        new: {
            state: 1, // 1使用，0未使用
            type: "",
            name: "",
            column_list: [],
        },
    };

    /**
     * 格式化 show create table 结果
     * @param sql
     * @returns {{auto_increment: {new: number, old: number}, engine: {new: string, old: string}, default_charset: {new: string, old: string}, name: {new: string, old: string}, comment: {new: string, old: string}, column_list: *[], index_list: *[]}}
     */
    static parseShowCreateTable(sql) {
        let formatted = {
            name: {
                old: "",
                new: "",
            },
            column_list: [],
            index_list: [],
            engine: {
                old: "InnoDB",
                new: "InnoDB",
            },
            auto_increment: {
                old: 1,
                new: 1,
            },
            default_charset: {
                old: "utf8mb4",
                new: "utf8mb4",
            },
            comment: {
                old: "",
                new: "",
            },
        };
        let a = sql.trim().split("\n").map(v => v.trim());
        let b = a.shift();
        let c = a.pop();
        if (c[c.length - 1] === ";") {
            c = c.substring(0, c.length - 1);
        }

        {
            let matched = b.match(/CREATE\sTABLE\s`(\S+)`\s/);
            if (matched) {
                let [, NAME] = matched;
                formatted.name.new = formatted.name.old = NAME;
            }
        }
        {
            let matched = c.match(/ENGINE=(\S*)/);
            if (matched) {
                let [, ENGINE] = matched;
                formatted.engine.new = formatted.engine.old = ENGINE;
            }
        }
        {
            let matched = c.match(/AUTO_INCREMENT=(\d+)/);
            if (matched) {
                let [, AUTO_INCREMENT] = matched;
                formatted.auto_increment.new = formatted.auto_increment.old = Number(AUTO_INCREMENT);
            }
        }
        {
            let matched = c.match(/DEFAULT\sCHARSET=(\S+)/);
            if (matched) {
                let [, DEFAULT_CHARSET] = matched;
                formatted.default_charset.new = formatted.default_charset.old = DEFAULT_CHARSET;
            }
        }
        {
            let matched = c.match(/COMMENT=(\S+)/);
            if (matched) {
                let [, COMMENT] = matched;
                formatted.comment.new = formatted.comment.old = COMMENT.length > 0 ? COMMENT.substring(1, COMMENT.length - 1) : "";
            }
        }
        {
            a.forEach(b => {
                if (b[0] === "`") {
                    let column = JSON.parse(JSON.stringify(this.COLUMN));
                    const match = b.match(/^`(\S+)`\s+(.*?)(?:\s+COMMENT\s+(.*))?[,]*$/);
                    let [, NAME, S, COMMENT] = match;
                    S = S.toUpperCase();
                    {
                        column.new.name = column.old.name = NAME;
                    }
                    {
                        COMMENT = (COMMENT || "").trim()
                        if (COMMENT.endsWith(",")) {
                            COMMENT = COMMENT.substring(1, COMMENT.length - 2)
                        } else {
                            COMMENT = COMMENT.substring(1, COMMENT.length - 1)
                        }
                        column.new.comment = column.old.comment = COMMENT;
                    }
                    {
                        let matched = S.match(/^(\w+)(?:\(([^)]*)\))?/);
                        let [, TYPE, PARAMETER] = matched;
                        column.new.type = column.old.type = TYPE;
                        if (PARAMETER) {
                            column.new.parameter_type = column.old.parameter_type = PARAMETER[0] === "'" ? "string" : "number"
                        }
                        column.new.parameter_list = column.old.parameter_list = PARAMETER ? PARAMETER.split(",").map(v => {
                            if (v.length > 0) {
                                if (v[0] === "'") {
                                    v = v.substring(1, v.length - 1)
                                } else {
                                    v = Number(v);
                                }
                            }
                            return v;
                        }) : [];
                    }
                    {
                        if (S.match(/UNSIGNED/)) {
                            column.new.unsigned = column.old.unsigned = true;
                        }
                    }
                    {
                        if (S.match(/NOT\s+NULL/)) {
                            column.new.not_null = column.old.not_null = true;
                        }
                    }
                    {
                        if (S.match(/AUTO_INCREMENT/)) {
                            column.new.auto_increment = column.old.auto_increment = true;
                        }
                    }
                    {
                        let matched = S.match(/DEFAULT\s+(.*)/);
                        if (matched) {
                            let [, DEFAULT] = matched;
                            if (DEFAULT.length > 0) {
                                if (DEFAULT === "NULL") {
                                    column.new.default = column.old.default = null
                                } else {
                                    if (DEFAULT[DEFAULT.length - 1] === "'") {
                                        column.new.default = column.old.default = DEFAULT.substring(1, DEFAULT.length - 1);
                                    } else {
                                        if (DEFAULT.endsWith("ON UPDATE CURRENT_TIMESTAMP")) {
                                            column.new.on_update_current_timestamp = column.old.on_update_current_timestamp = true;
                                            DEFAULT = DEFAULT.replace(/\s*ON UPDATE CURRENT_TIMESTAMP\s*$/i, '').trim();
                                            column.new.default = column.old.default = DEFAULT.substring(1, DEFAULT.length - 1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    formatted.column_list.push(column);
                } else {
                    let index = JSON.parse(JSON.stringify(this.INDEX));
                    {
                        let matched = b.match(/^PRIMARY\sKEY\s\((.*)\)/);
                        if (matched) {
                            let [, column] = matched;
                            index.new.type = index.old.type = "PRIMARY";
                            index.new.name = index.old.name = "";
                            index.new.column_list = index.old.column_list = column.trim().split(",").map(v => v.substring(1, v.length - 1));
                            formatted.index_list.push(index);
                            return;
                        }
                    }
                    {
                        let matched = b.match(/^UNIQUE\sKEY\s`(\S+)`\s+\((.*)\)/)
                        if (matched) {
                            let [, name, column] = matched;
                            index.new.type = index.old.type = "UNIQUE";
                            index.new.name = index.old.name = name;
                            index.new.column_list = index.old.column_list = column.trim().split(",").map(v => v.substring(1, v.length - 1));
                            formatted.index_list.push(index);
                            return;
                        }
                    }
                    {
                        let matched = b.match(/^KEY\s`(.*)`\s\((.*)\)/)
                        if (matched) {
                            let [, name, column] = matched;
                            index.new.type = index.old.type = "KEY";
                            index.new.name = index.old.name = name;
                            index.new.column_list = index.old.column_list = column.trim().split(",").map(v => v.substring(1, v.length - 1));
                            formatted.index_list.push(index);
                            return;
                        }
                    }
                }
            });
        }

        return formatted;

    }

    /**
     * 组装成 show create table 结果
     * @param formatted
     * @param indent
     * @returns {string}
     */
    static buildShowCreateTable(formatted, indent = "") {
        let a = [];
        formatted.column_list.forEach(v => {
            let b = indent + "`" + v.new.name + "` " + v.new.type;
            if (v.new.parameter_list.length > 0) {
                b += v.new.parameter_type === "string" ? "(" + v.new.parameter_list.map(vv => "'" + vv + "'").join(",") + ")" : "(" + v.new.parameter_list.join(",") + ")";
            }
            if (v.new.unsigned) {
                b += " UNSIGNED";
            }
            if (v.new.not_null) {
                b += " NOT NULL";
            } else {
                b += " NULL";
            }
            if (v.new.auto_increment) {
                b += " AUTO_INCREMENT";
            }
            if (v.new.default !== undefined) {
                if (v.new.default === null) {
                    b += " DEFAULT NULL"
                } else {
                    b += ` DEFAULT '${v.new.default}'`
                }
            }
            if (v.new.on_update_current_timestamp) {
                b += " ON UPDATE CURRENT_TIMESTAMP";
            }
            b += ` COMMENT '${v.new.comment}'`;
            a.push(b);
        });
        formatted.index_list.forEach(v => {
            switch (v.new.type) {
                case "PRIMARY": {
                    let b = indent + "PRIMARY KEY (" + v.new.column_list.map(v => {
                        return "`" + v + "`"
                    }).join(",") + ")";
                    a.push(b);
                }
                    break;
                case "UNIQUE": {
                    let b = indent + "UNIQUE KEY `" + v.new.name + "` (" + v.new.column_list.map((v) => {
                        return "`" + v + "`"
                    }).join(",") + ")";
                    a.push(b);
                }
                    break;
                case "KEY": {
                    let b = indent + "KEY `" + v.new.name + "` (" + v.new.column_list.map((v) => {
                        return "`" + v + "`"
                    }).join(",") + ")";
                    a.push(b);
                }
                    break;
            }
        });
        let b = "CREATE TABLE `" + formatted.name.new + "` (\n";
        b += a.join(",\n");
        b += `\n) ENGINE=${formatted.engine.new} AUTO_INCREMENT=${formatted.auto_increment.new} DEFAULT CHARSET=${formatted.default_charset.new} COMMENT='${formatted.comment.new}'`;
        return b;
    }

    static buildColumnSql(column) {
        let b = "`" + column.name + "` " + column.type;
        if (column.parameter_list.length > 0) {
            b += column.parameter_type === "string" ? "(" + column.parameter_list.map(vv => "'" + vv + "'").join(",") + ")" : "(" + column.parameter_list.join(",") + ")";
        }
        if (column.unsigned) {
            b += " UNSIGNED";
        }
        if (column.not_null) {
            b += " NOT NULL";
        } else {
            b += " NULL";
        }
        if (column.auto_increment) {
            b += " AUTO_INCREMENT";
        }
        if (column.default !== undefined) {
            if (column.default === null) {
                b += " DEFAULT NULL"
            } else {
                b += ` DEFAULT '${column.default}'`
            }
        }
        if (column.on_update_current_timestamp) {
            b += " ON UPDATE CURRENT_TIMESTAMP";
        }
        b += ` COMMENT '${column.comment}'`;
        return b;
    }

    static buildIndexSql(index) {
        switch (index.type) {
            case "PRIMARY": {
                return "PRIMARY KEY (" + index.column_list.map(v => {
                    return "`" + v + "`"
                }).join(",") + ")";
            }
            case "UNIQUE": {
                return "UNIQUE KEY `" + index.name + "` (" + index.column_list.map((v) => {
                    return "`" + v + "`"
                }).join(",") + ")";
            }
            case "KEY": {
                return "KEY `" + index.name + "` (" + index.column_list.map((v) => {
                    return "`" + v + "`"
                }).join(",") + ")";
            }
        }
    }

    /**
     * 分析dormatted找到差异，生成调整SQL
     * @param formatted
     */
    static buildDiffSql(formatted) {

        let diff = [];


        // 字段
        formatted.column_list.forEach(v => {
            if (v.old.state === 1 && v.new.state === 0) {
                diff.push("DROP COLUMN `" + v.old.name + "`")
                return;
            }
            if (v.old.state === 0 && v.new.state === 1) {
                let n = this.buildColumnSql(v.new);
                diff.push("ADD COLUMN " + n + "")
                return;
            }
            if (v.old.state === 1 && v.new.state === 1) {
                let o = this.buildColumnSql(v.old);
                let n = this.buildColumnSql(v.new);
                if (o !== n) {
                    diff.push("CHANGE COLUMN `" + v.old.name + "` " + n + "")
                }
                return;
            }
        });
        formatted.index_list.forEach(v => {
            // 删除
            if (v.old.state === 1 && v.new.state === 0) {
                switch (v.old.type) {
                    case "PRIMARY": {
                        diff.push("DROP PRIMARY KEY");
                        return;
                    }
                    case "UNIQUE": {
                        diff.push("DROP INDEX `" + v.old.name + "`");
                        return;
                    }
                    case "KEY": {
                        diff.push("DROP INDEX `" + v.old.name + "`");
                        return;
                    }
                }
                return;
            }
            // 新建
            if (v.old.state === 0 && v.new.state === 1) {
                switch (v.new.type) {
                    case "PRIMARY": {
                        let n = this.buildIndexSql(v.new);
                        diff.push("ADD " + n);
                        return;
                    }
                    case "UNIQUE": {
                        let n = this.buildIndexSql(v.new);
                        diff.push("ADD " + n);
                        return;
                    }
                    case "KEY": {
                        let n = this.buildIndexSql(v.new);
                        diff.push("ADD " + n);
                        return;
                    }
                }
                return;
            }
            // 修改
            if (v.old.state === 1 && v.new.state === 1) {
                let o = this.buildIndexSql(v.old);
                let n = this.buildIndexSql(v.new);
                if (o !== n) {
                    // 先删除
                    switch (v.old.type) {
                        case "PRIMARY": {
                            diff.push("DROP PRIMARY KEY");
                            break;
                        }
                        case "UNIQUE": {
                            diff.push("DROP INDEX `" + v.old.name + "`");
                            break;
                        }
                        case "KEY": {
                            diff.push("DROP INDEX `" + v.old.name + "`");
                            break;
                        }
                    }
                    // 再创建
                    switch (v.new.type) {
                        case "PRIMARY": {
                            diff.push("ADD " + n);
                            return;
                        }
                        case "UNIQUE": {
                            diff.push("ADD " + n);
                            return;
                        }
                        case "KEY": {
                            diff.push("ADD " + n);
                            return;
                        }
                    }
                }
            }
        });
        let o = "";
        if (diff.length > 0) {
            o = "ALTER TABLE `" + formatted.name.old + "`\n"
            o += "" + diff.join(",\n");
            o += "\n;";
        }
        return o;
    }

    static buildSqlTableChangeName(oldName, newName) {
        return "ALTER TABLE `" + oldName + "` RENAME TO `" + newName + "`;"
    }

    static buildSqlTableChangeEngine(tableName, EngineName) {
        return "ALTER TABLE `" + tableName + "` ENGINE = " + EngineName + ";"
    }

    static buildSqlTableChangeAutoIncrement(tableName, autoIncrement) {
        return "ALTER TABLE `" + tableName + "` AUTO_INCREMENT = " + autoIncrement + ";"
    }

    static buildSqlTableChangeComment(tableName, newComment) {
        return "ALTER TABLE `" + tableName + "` COMMENT = '" + newComment + "';"
    }

    static buildSqlTableChangeCharset(tableName, newCharacter, newCollate) {
        return "ALTER TABLE `" + tableName + "` CONVERT TO CHARACTER SET " + newCharacter + " COLLATE " + newCollate + ";"
    }

}
