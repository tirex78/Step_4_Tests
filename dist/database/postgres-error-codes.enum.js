"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PostgresErrorCode;
(function (PostgresErrorCode) {
    PostgresErrorCode["UniqueViolation"] = "23505";
    PostgresErrorCode["NotNullViolation"] = "23502";
    PostgresErrorCode["ForeignKeyViolation"] = "23503";
    PostgresErrorCode["CheckViolation"] = "23514";
})(PostgresErrorCode || (PostgresErrorCode = {}));
exports.default = PostgresErrorCode;
//# sourceMappingURL=postgres-error-codes.enum.js.map