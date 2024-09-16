"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
var typeorm_1 = require("typeorm");
var DataRecord_1 = require("./DataRecord");
var Verse_1 = require("./Verse");
var Tome_1 = require("./Tome");
var Book = /** @class */ (function (_super) {
    __extends(Book, _super);
    function Book() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], Book.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 100, nullable: false }),
        __metadata("design:type", String)
    ], Book.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ type: 'tinyint', nullable: true }),
        __metadata("design:type", Number)
    ], Book.prototype, "genre_id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 100 }),
        __metadata("design:type", String)
    ], Book.prototype, "sub_title", void 0);
    __decorate([
        typeorm_1.Column({ type: 'int', nullable: true }),
        __metadata("design:type", Number)
    ], Book.prototype, "source_id", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Verse_1.Verse; }, function (verse) { return verse.book; }),
        __metadata("design:type", Array)
    ], Book.prototype, "verses", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Tome_1.Tome; }, function (tome) { return tome.books; }),
        typeorm_1.JoinColumn({ name: 'tome_id' }),
        __metadata("design:type", Tome_1.Tome)
    ], Book.prototype, "tome", void 0);
    __decorate([
        typeorm_1.Column({ type: 'smallint', nullable: false }),
        __metadata("design:type", Number)
    ], Book.prototype, "tome_id", void 0);
    Book = __decorate([
        typeorm_1.Entity()
    ], Book);
    return Book;
}(DataRecord_1.DataRecord));
exports.Book = Book;