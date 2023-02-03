var Person = /** @class */ (function () {
    function Person(config) {
        this._id = config.id;
        this._x = config.x;
        this._y = config.y;
    }
    Object.defineProperty(Person.prototype, "id", {
        get: function () {
            return "Meu ID \u00E9 ".concat(this._id);
        },
        set: function (newValue) {
            this._id = newValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "position", {
        get: function () {
            return {
                x: this._x,
                y: this._y,
            };
        },
        set: function (_a) {
            var x = _a.x, y = _a.y;
            this._x = x;
            this._y = y;
        },
        enumerable: false,
        configurable: true
    });
    return Person;
}());
var p = new Person({ id: "my-id-here" });
console.log(p.id);
//# sourceMappingURL=scripts.js.map