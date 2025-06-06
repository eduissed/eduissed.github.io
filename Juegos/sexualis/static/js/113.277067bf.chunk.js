"use strict";
(self.webpackChunk_genially_view_client =
  self.webpackChunk_genially_view_client || []).push([
  [113, 566],
  {
    69497: (e, t, i) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.QuickJSAsyncContext = void 0);
      const n = i(46953),
        r = i(50618),
        o = i(95812);
      class s extends n.QuickJSContext {
        async evalCodeAsync(e) {
          let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "eval.js",
            i = arguments.length > 2 ? arguments[2] : void 0;
          const n = void 0 === i ? 1 : 0,
            s = (0, o.evalOptionsToFlags)(i);
          let a = 0;
          try {
            a = await this.memory
              .newHeapCharPointer(e)
              .consume((e) =>
                this.ffi.QTS_Eval_MaybeAsync(this.ctx.value, e.value, t, n, s)
              );
          } catch (l) {
            throw ((0, r.debugLog)("QTS_Eval_MaybeAsync threw", l), l);
          }
          const u = this.ffi.QTS_ResolveException(this.ctx.value, a);
          return u
            ? (this.ffi.QTS_FreeValuePointer(this.ctx.value, a),
              { error: this.memory.heapValueHandle(u) })
            : { value: this.memory.heapValueHandle(a) };
        }
        newAsyncifiedFunction(e, t) {
          return this.newFunction(e, t);
        }
      }
      t.QuickJSAsyncContext = s;
    },
    46953: (e, t, i) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.QuickJSContext = void 0);
      const n = i(50618),
        r = i(19991),
        o = i(35541),
        s = i(39045),
        a = i(10302),
        u = i(95812);
      class l extends a.ModuleMemory {
        constructor(e) {
          var t;
          super(e.module),
            (this.scope = new s.Scope()),
            (this.copyJSValue = (e) =>
              this.ffi.QTS_DupValuePointer(this.ctx.value, e)),
            (this.freeJSValue = (e) => {
              this.ffi.QTS_FreeValuePointer(this.ctx.value, e);
            }),
            null === (t = e.ownedLifetimes) ||
              void 0 === t ||
              t.forEach((e) => this.scope.manage(e)),
            (this.owner = e.owner),
            (this.module = e.module),
            (this.ffi = e.ffi),
            (this.rt = e.rt),
            (this.ctx = this.scope.manage(e.ctx));
        }
        get alive() {
          return this.scope.alive;
        }
        dispose() {
          return this.scope.dispose();
        }
        manage(e) {
          return this.scope.manage(e);
        }
        consumeJSCharPointer(e) {
          const t = this.module.UTF8ToString(e);
          return this.ffi.QTS_FreeCString(this.ctx.value, e), t;
        }
        heapValueHandle(e) {
          return new s.Lifetime(
            e,
            this.copyJSValue,
            this.freeJSValue,
            this.owner
          );
        }
      }
      t.QuickJSContext = class {
        constructor(e) {
          (this._undefined = void 0),
            (this._null = void 0),
            (this._false = void 0),
            (this._true = void 0),
            (this._global = void 0),
            (this._BigInt = void 0),
            (this.fnNextId = -32768),
            (this.fnMaps = new Map()),
            (this.cToHostCallbacks = {
              callFunction: (e, t, i, r, o) => {
                if (e !== this.ctx.value)
                  throw new Error(
                    "QuickJSContext instance received C -> JS call with mismatched ctx"
                  );
                const a = this.getFunction(o);
                if (!a)
                  throw new Error(
                    "QuickJSContext had no callback with id ".concat(o)
                  );
                return s.Scope.withScopeMaybeAsync(this, function* (e, o) {
                  const u = o.manage(
                      new s.WeakLifetime(
                        t,
                        this.memory.copyJSValue,
                        this.memory.freeJSValue,
                        this.runtime
                      )
                    ),
                    l = new Array(i);
                  for (let t = 0; t < i; t++) {
                    const e = this.ffi.QTS_ArgvGetJSValueConstPointer(r, t);
                    l[t] = o.manage(
                      new s.WeakLifetime(
                        e,
                        this.memory.copyJSValue,
                        this.memory.freeJSValue,
                        this.runtime
                      )
                    );
                  }
                  try {
                    const t = yield* e(a.apply(u, l));
                    if (t) {
                      if ("error" in t && t.error)
                        throw (
                          ((0, n.debugLog)("throw error", t.error), t.error)
                        );
                      const e = o.manage(t instanceof s.Lifetime ? t : t.value);
                      return this.ffi.QTS_DupValuePointer(
                        this.ctx.value,
                        e.value
                      );
                    }
                    return 0;
                  } catch (c) {
                    return this.errorToHandle(c).consume((e) =>
                      this.ffi.QTS_Throw(this.ctx.value, e.value)
                    );
                  }
                });
              },
            }),
            (this.runtime = e.runtime),
            (this.module = e.module),
            (this.ffi = e.ffi),
            (this.rt = e.rt),
            (this.ctx = e.ctx),
            (this.memory = new l({ ...e, owner: this.runtime })),
            e.callbacks.setContextCallbacks(
              this.ctx.value,
              this.cToHostCallbacks
            ),
            (this.dump = this.dump.bind(this)),
            (this.getString = this.getString.bind(this)),
            (this.getNumber = this.getNumber.bind(this)),
            (this.resolvePromise = this.resolvePromise.bind(this));
        }
        get alive() {
          return this.memory.alive;
        }
        dispose() {
          this.memory.dispose();
        }
        get undefined() {
          if (this._undefined) return this._undefined;
          const e = this.ffi.QTS_GetUndefined();
          return (this._undefined = new s.StaticLifetime(e));
        }
        get null() {
          if (this._null) return this._null;
          const e = this.ffi.QTS_GetNull();
          return (this._null = new s.StaticLifetime(e));
        }
        get true() {
          if (this._true) return this._true;
          const e = this.ffi.QTS_GetTrue();
          return (this._true = new s.StaticLifetime(e));
        }
        get false() {
          if (this._false) return this._false;
          const e = this.ffi.QTS_GetFalse();
          return (this._false = new s.StaticLifetime(e));
        }
        get global() {
          if (this._global) return this._global;
          const e = this.ffi.QTS_GetGlobalObject(this.ctx.value);
          return (
            this.memory.manage(this.memory.heapValueHandle(e)),
            (this._global = new s.StaticLifetime(e, this.runtime)),
            this._global
          );
        }
        newNumber(e) {
          return this.memory.heapValueHandle(
            this.ffi.QTS_NewFloat64(this.ctx.value, e)
          );
        }
        newString(e) {
          const t = this.memory
            .newHeapCharPointer(e)
            .consume((e) => this.ffi.QTS_NewString(this.ctx.value, e.value));
          return this.memory.heapValueHandle(t);
        }
        newUniqueSymbol(e) {
          var t;
          const i =
              null !== (t = "symbol" === typeof e ? e.description : e) &&
              void 0 !== t
                ? t
                : "",
            n = this.memory
              .newHeapCharPointer(i)
              .consume((e) =>
                this.ffi.QTS_NewSymbol(this.ctx.value, e.value, 0)
              );
          return this.memory.heapValueHandle(n);
        }
        newSymbolFor(e) {
          var t;
          const i =
              null !== (t = "symbol" === typeof e ? e.description : e) &&
              void 0 !== t
                ? t
                : "",
            n = this.memory
              .newHeapCharPointer(i)
              .consume((e) =>
                this.ffi.QTS_NewSymbol(this.ctx.value, e.value, 1)
              );
          return this.memory.heapValueHandle(n);
        }
        newBigInt(e) {
          if (!this._BigInt) {
            const e = this.getProp(this.global, "BigInt");
            this.memory.manage(e),
              (this._BigInt = new s.StaticLifetime(e.value, this.runtime));
          }
          const t = this._BigInt,
            i = String(e);
          return this.newString(i).consume((e) =>
            this.unwrapResult(this.callFunction(t, this.undefined, e))
          );
        }
        newObject(e) {
          e && this.runtime.assertOwned(e);
          const t = e
            ? this.ffi.QTS_NewObjectProto(this.ctx.value, e.value)
            : this.ffi.QTS_NewObject(this.ctx.value);
          return this.memory.heapValueHandle(t);
        }
        newArray() {
          const e = this.ffi.QTS_NewArray(this.ctx.value);
          return this.memory.heapValueHandle(e);
        }
        newPromise(e) {
          const t = s.Scope.withScope((e) => {
            const t = e.manage(this.memory.newMutablePointerArray(2)),
              i = this.ffi.QTS_NewPromiseCapability(
                this.ctx.value,
                t.value.ptr
              ),
              n = this.memory.heapValueHandle(i),
              [o, s] = Array.from(t.value.typedArray).map((e) =>
                this.memory.heapValueHandle(e)
              );
            return new r.QuickJSDeferredPromise({
              context: this,
              promiseHandle: n,
              resolveHandle: o,
              rejectHandle: s,
            });
          });
          return (
            e && "function" === typeof e && (e = new Promise(e)),
            e &&
              Promise.resolve(e).then(t.resolve, (e) =>
                e instanceof s.Lifetime
                  ? t.reject(e)
                  : this.newError(e).consume(t.reject)
              ),
            t
          );
        }
        newFunction(e, t) {
          const i = ++this.fnNextId;
          return (
            this.setFunction(i, t),
            this.memory.heapValueHandle(
              this.ffi.QTS_NewFunction(this.ctx.value, i, e)
            )
          );
        }
        newError(e) {
          const t = this.memory.heapValueHandle(
            this.ffi.QTS_NewError(this.ctx.value)
          );
          return (
            e && "object" === typeof e
              ? (void 0 !== e.name &&
                  this.newString(e.name).consume((e) =>
                    this.setProp(t, "name", e)
                  ),
                void 0 !== e.message &&
                  this.newString(e.message).consume((e) =>
                    this.setProp(t, "message", e)
                  ))
              : "string" === typeof e
              ? this.newString(e).consume((e) => this.setProp(t, "message", e))
              : void 0 !== e &&
                this.newString(String(e)).consume((e) =>
                  this.setProp(t, "message", e)
                ),
            t
          );
        }
        typeof(e) {
          return (
            this.runtime.assertOwned(e),
            this.memory.consumeHeapCharPointer(
              this.ffi.QTS_Typeof(this.ctx.value, e.value)
            )
          );
        }
        getNumber(e) {
          return (
            this.runtime.assertOwned(e),
            this.ffi.QTS_GetFloat64(this.ctx.value, e.value)
          );
        }
        getString(e) {
          return (
            this.runtime.assertOwned(e),
            this.memory.consumeJSCharPointer(
              this.ffi.QTS_GetString(this.ctx.value, e.value)
            )
          );
        }
        getSymbol(e) {
          this.runtime.assertOwned(e);
          const t = this.memory.consumeJSCharPointer(
            this.ffi.QTS_GetSymbolDescriptionOrKey(this.ctx.value, e.value)
          );
          return this.ffi.QTS_IsGlobalSymbol(this.ctx.value, e.value)
            ? Symbol.for(t)
            : Symbol(t);
        }
        getBigInt(e) {
          this.runtime.assertOwned(e);
          const t = this.getString(e);
          return BigInt(t);
        }
        resolvePromise(e) {
          this.runtime.assertOwned(e);
          const t = s.Scope.withScope((t) => {
            const i = t.manage(this.getProp(this.global, "Promise")),
              n = t.manage(this.getProp(i, "resolve"));
            return this.callFunction(n, i, e);
          });
          return t.error
            ? Promise.resolve(t)
            : new Promise((e) => {
                s.Scope.withScope((i) => {
                  const n = i.manage(
                      this.newFunction("resolve", (t) => {
                        e({ value: t && t.dup() });
                      })
                    ),
                    r = i.manage(
                      this.newFunction("reject", (t) => {
                        e({ error: t && t.dup() });
                      })
                    ),
                    o = i.manage(t.value),
                    s = i.manage(this.getProp(o, "then"));
                  this.unwrapResult(this.callFunction(s, o, n, r)).dispose();
                });
              });
        }
        getProp(e, t) {
          this.runtime.assertOwned(e);
          const i = this.borrowPropertyKey(t).consume((t) =>
            this.ffi.QTS_GetProp(this.ctx.value, e.value, t.value)
          );
          return this.memory.heapValueHandle(i);
        }
        setProp(e, t, i) {
          this.runtime.assertOwned(e),
            this.borrowPropertyKey(t).consume((t) =>
              this.ffi.QTS_SetProp(this.ctx.value, e.value, t.value, i.value)
            );
        }
        defineProp(e, t, i) {
          this.runtime.assertOwned(e),
            s.Scope.withScope((n) => {
              const r = n.manage(this.borrowPropertyKey(t)),
                o = i.value || this.undefined,
                s = Boolean(i.configurable),
                a = Boolean(i.enumerable),
                u = Boolean(i.value),
                l = i.get
                  ? n.manage(this.newFunction(i.get.name, i.get))
                  : this.undefined,
                c = i.set
                  ? n.manage(this.newFunction(i.set.name, i.set))
                  : this.undefined;
              this.ffi.QTS_DefineProp(
                this.ctx.value,
                e.value,
                r.value,
                o.value,
                l.value,
                c.value,
                s,
                a,
                u
              );
            });
        }
        callFunction(e, t) {
          for (
            var i = arguments.length, n = new Array(i > 2 ? i - 2 : 0), r = 2;
            r < i;
            r++
          )
            n[r - 2] = arguments[r];
          this.runtime.assertOwned(e);
          const o = this.memory
              .toPointerArray(n)
              .consume((i) =>
                this.ffi.QTS_Call(
                  this.ctx.value,
                  e.value,
                  t.value,
                  n.length,
                  i.value
                )
              ),
            s = this.ffi.QTS_ResolveException(this.ctx.value, o);
          return s
            ? (this.ffi.QTS_FreeValuePointer(this.ctx.value, o),
              { error: this.memory.heapValueHandle(s) })
            : { value: this.memory.heapValueHandle(o) };
        }
        evalCode(e) {
          let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "eval.js",
            i = arguments.length > 2 ? arguments[2] : void 0;
          const n = void 0 === i ? 1 : 0,
            r = (0, u.evalOptionsToFlags)(i),
            o = this.memory
              .newHeapCharPointer(e)
              .consume((e) =>
                this.ffi.QTS_Eval(this.ctx.value, e.value, t, n, r)
              ),
            s = this.ffi.QTS_ResolveException(this.ctx.value, o);
          return s
            ? (this.ffi.QTS_FreeValuePointer(this.ctx.value, o),
              { error: this.memory.heapValueHandle(s) })
            : { value: this.memory.heapValueHandle(o) };
        }
        throw(e) {
          return this.errorToHandle(e).consume((e) =>
            this.ffi.QTS_Throw(this.ctx.value, e.value)
          );
        }
        borrowPropertyKey(e) {
          return "number" === typeof e
            ? this.newNumber(e)
            : "string" === typeof e
            ? this.newString(e)
            : new s.StaticLifetime(e.value, this.runtime);
        }
        getMemory(e) {
          if (e === this.rt.value) return this.memory;
          throw new Error(
            "Private API. Cannot get memory from a different runtime"
          );
        }
        dump(e) {
          this.runtime.assertOwned(e);
          const t = this.typeof(e);
          if ("string" === t) return this.getString(e);
          if ("number" === t) return this.getNumber(e);
          if ("bigint" === t) return this.getBigInt(e);
          if ("undefined" === t) return;
          if ("symbol" === t) return this.getSymbol(e);
          const i = this.memory.consumeJSCharPointer(
            this.ffi.QTS_Dump(this.ctx.value, e.value)
          );
          try {
            return JSON.parse(i);
          } catch (n) {
            return i;
          }
        }
        unwrapResult(e) {
          if (e.error) {
            const t = "context" in e.error ? e.error.context : this,
              i = e.error.consume((e) => this.dump(e));
            if (i && "object" === typeof i && "string" === typeof i.message) {
              const { message: e, name: n, stack: r } = i,
                s = new o.QuickJSUnwrapError(""),
                a = s.stack;
              throw (
                ("string" === typeof n && (s.name = i.name),
                "string" === typeof r &&
                  (s.stack = ""
                    .concat(n, ": ")
                    .concat(e, "\n")
                    .concat(i.stack, "Host: ")
                    .concat(a)),
                Object.assign(s, { cause: i, context: t, message: e }),
                s)
              );
            }
            throw new o.QuickJSUnwrapError(i, t);
          }
          return e.value;
        }
        getFunction(e) {
          const t = e >> 8,
            i = this.fnMaps.get(t);
          if (i) return i.get(e);
        }
        setFunction(e, t) {
          const i = e >> 8;
          let n = this.fnMaps.get(i);
          return n || ((n = new Map()), this.fnMaps.set(i, n)), n.set(e, t);
        }
        errorToHandle(e) {
          return e instanceof s.Lifetime ? e : this.newError(e);
        }
      };
    },
    10302: (e, t, i) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.ModuleMemory = void 0);
      const n = i(39045);
      t.ModuleMemory = class {
        constructor(e) {
          this.module = e;
        }
        toPointerArray(e) {
          const t = new Int32Array(e.map((e) => e.value)),
            i = t.length * t.BYTES_PER_ELEMENT,
            r = this.module._malloc(i);
          return (
            new Uint8Array(this.module.HEAPU8.buffer, r, i).set(
              new Uint8Array(t.buffer)
            ),
            new n.Lifetime(r, void 0, (e) => this.module._free(e))
          );
        }
        newMutablePointerArray(e) {
          const t = new Int32Array(new Array(e).fill(0)),
            i = t.length * t.BYTES_PER_ELEMENT,
            r = this.module._malloc(i),
            o = new Int32Array(this.module.HEAPU8.buffer, r, e);
          return (
            o.set(t),
            new n.Lifetime({ typedArray: o, ptr: r }, void 0, (e) =>
              this.module._free(e.ptr)
            )
          );
        }
        newHeapCharPointer(e) {
          const t = this.module.lengthBytesUTF8(e) + 1,
            i = this.module._malloc(t);
          return (
            this.module.stringToUTF8(e, i, t),
            new n.Lifetime(i, void 0, (e) => this.module._free(e))
          );
        }
        consumeHeapCharPointer(e) {
          const t = this.module.UTF8ToString(e);
          return this.module._free(e), t;
        }
      };
    },
    58113: (e, t, i) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.QuickJSAsyncWASMModule = void 0);
      const n = i(35541),
        r = i(39045),
        o = i(6566),
        s = i(46203);
      class a extends o.QuickJSWASMModule {
        constructor(e, t) {
          super(e, t), (this.ffi = t), (this.module = e);
        }
        newRuntime() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          const t = new r.Lifetime(this.ffi.QTS_NewRuntime(), void 0, (e) => {
              this.callbacks.deleteRuntime(e), this.ffi.QTS_FreeRuntime(e);
            }),
            i = new s.QuickJSAsyncRuntime({
              module: this.module,
              ffi: this.ffi,
              rt: t,
              callbacks: this.callbacks,
            });
          return (
            (0, o.applyBaseRuntimeOptions)(i, e),
            e.moduleLoader && i.setModuleLoader(e.moduleLoader),
            i
          );
        }
        newContext() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          const t = this.newRuntime(),
            i = e.ownedLifetimes ? e.ownedLifetimes.concat([t]) : [t],
            n = t.newContext({ ...e, ownedLifetimes: i });
          return (t.context = n), n;
        }
        evalCode() {
          throw new n.QuickJSNotImplemented(
            "QuickJSWASMModuleAsyncify.evalCode: use evalCodeAsync instead"
          );
        }
        evalCodeAsync(e, t) {
          return r.Scope.withScopeAsync(async (i) => {
            const n = i.manage(this.newContext());
            (0, o.applyModuleEvalRuntimeOptions)(n.runtime, t);
            const r = await n.evalCodeAsync(e, "eval.js");
            if (
              (void 0 !== t.memoryLimitBytes && n.runtime.setMemoryLimit(-1),
              r.error)
            ) {
              throw n.dump(i.manage(r.error));
            }
            return n.dump(i.manage(r.value));
          });
        }
      }
      t.QuickJSAsyncWASMModule = a;
    },
    6566: (e, t, i) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.QuickJSWASMModule =
          t.applyModuleEvalRuntimeOptions =
          t.applyBaseRuntimeOptions =
          t.QuickJSModuleCallbacks =
            void 0);
      const n = i(50618),
        r = i(35541),
        o = i(39045),
        s = i(14309),
        a = i(95812);
      class u {
        constructor(e) {
          (this.callFunction = e.callFunction),
            (this.shouldInterrupt = e.shouldInterrupt),
            (this.loadModuleSource = e.loadModuleSource),
            (this.normalizeModule = e.normalizeModule);
        }
      }
      class l {
        constructor(e) {
          (this.contextCallbacks = new Map()),
            (this.runtimeCallbacks = new Map()),
            (this.suspendedCount = 0),
            (this.cToHostCallbacks = new u({
              callFunction: (e, t, i, n, r, o) =>
                this.handleAsyncify(e, () => {
                  try {
                    const e = this.contextCallbacks.get(t);
                    if (!e)
                      throw new Error(
                        "QuickJSContext(ctx = "
                          .concat(t, ') not found for C function call "')
                          .concat(o, '"')
                      );
                    return e.callFunction(t, i, n, r, o);
                  } catch (e) {
                    return (
                      console.error("[C to host error: returning null]", e), 0
                    );
                  }
                }),
              shouldInterrupt: (e, t) =>
                this.handleAsyncify(e, () => {
                  try {
                    const e = this.runtimeCallbacks.get(t);
                    if (!e)
                      throw new Error(
                        "QuickJSRuntime(rt = ".concat(
                          t,
                          ") not found for C interrupt"
                        )
                      );
                    return e.shouldInterrupt(t);
                  } catch (e) {
                    return (
                      console.error(
                        "[C to host interrupt: returning error]",
                        e
                      ),
                      1
                    );
                  }
                }),
              loadModuleSource: (e, t, i, n) =>
                this.handleAsyncify(e, () => {
                  try {
                    const e = this.runtimeCallbacks.get(t);
                    if (!e)
                      throw new Error(
                        "QuickJSRuntime(rt = ".concat(
                          t,
                          ") not found for C module loader"
                        )
                      );
                    const r = e.loadModuleSource;
                    if (!r)
                      throw new Error(
                        "QuickJSRuntime(rt = ".concat(
                          t,
                          ") does not support module loading"
                        )
                      );
                    return r(t, i, n);
                  } catch (e) {
                    return (
                      console.error(
                        "[C to host module loader error: returning null]",
                        e
                      ),
                      0
                    );
                  }
                }),
              normalizeModule: (e, t, i, n, r) =>
                this.handleAsyncify(e, () => {
                  try {
                    const e = this.runtimeCallbacks.get(t);
                    if (!e)
                      throw new Error(
                        "QuickJSRuntime(rt = ".concat(
                          t,
                          ") not found for C module loader"
                        )
                      );
                    const o = e.normalizeModule;
                    if (!o)
                      throw new Error(
                        "QuickJSRuntime(rt = ".concat(
                          t,
                          ") does not support module loading"
                        )
                      );
                    return o(t, i, n, r);
                  } catch (e) {
                    return (
                      console.error(
                        "[C to host module loader error: returning null]",
                        e
                      ),
                      0
                    );
                  }
                }),
            })),
            (this.module = e),
            (this.module.callbacks = this.cToHostCallbacks);
        }
        setRuntimeCallbacks(e, t) {
          this.runtimeCallbacks.set(e, t);
        }
        deleteRuntime(e) {
          this.runtimeCallbacks.delete(e);
        }
        setContextCallbacks(e, t) {
          this.contextCallbacks.set(e, t);
        }
        deleteContext(e) {
          this.contextCallbacks.delete(e);
        }
        handleAsyncify(e, t) {
          if (e)
            return e.handleSleep((e) => {
              try {
                const i = t();
                if (!(i instanceof Promise))
                  return (
                    (0, n.debugLog)("asyncify.handleSleep: not suspending:", i),
                    void e(i)
                  );
                if (this.suspended)
                  throw new r.QuickJSAsyncifyError(
                    "Already suspended at: ".concat(
                      this.suspended.stack,
                      "\nAttempted to suspend at:"
                    )
                  );
                (this.suspended = new r.QuickJSAsyncifySuspended(
                  "(".concat(this.suspendedCount++, ")")
                )),
                  (0, n.debugLog)(
                    "asyncify.handleSleep: suspending:",
                    this.suspended
                  ),
                  i.then(
                    (t) => {
                      (this.suspended = void 0),
                        (0, n.debugLog)("asyncify.handleSleep: resolved:", t),
                        e(t);
                    },
                    (e) => {
                      (0, n.debugLog)("asyncify.handleSleep: rejected:", e),
                        console.error(
                          "QuickJS: cannot handle error in suspended function",
                          e
                        ),
                        (this.suspended = void 0);
                    }
                  );
              } catch (i) {
                throw (
                  ((0, n.debugLog)("asyncify.handleSleep: error:", i),
                  (this.suspended = void 0),
                  i)
                );
              }
            });
          const i = t();
          if (i instanceof Promise)
            throw new Error(
              "Promise return value not supported in non-asyncify context."
            );
          return i;
        }
      }
      function c(e, t) {
        t.interruptHandler && e.setInterruptHandler(t.interruptHandler),
          void 0 !== t.maxStackSizeBytes &&
            e.setMaxStackSize(t.maxStackSizeBytes),
          void 0 !== t.memoryLimitBytes && e.setMemoryLimit(t.memoryLimitBytes);
      }
      function h(e, t) {
        t.moduleLoader && e.setModuleLoader(t.moduleLoader),
          t.shouldInterrupt && e.setInterruptHandler(t.shouldInterrupt),
          void 0 !== t.memoryLimitBytes && e.setMemoryLimit(t.memoryLimitBytes),
          void 0 !== t.maxStackSizeBytes &&
            e.setMaxStackSize(t.maxStackSizeBytes);
      }
      (t.QuickJSModuleCallbacks = l),
        (t.applyBaseRuntimeOptions = c),
        (t.applyModuleEvalRuntimeOptions = h);
      t.QuickJSWASMModule = class {
        constructor(e, t) {
          (this.module = e), (this.ffi = t), (this.callbacks = new l(e));
        }
        newRuntime() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          const t = new o.Lifetime(this.ffi.QTS_NewRuntime(), void 0, (e) => {
              this.callbacks.deleteRuntime(e), this.ffi.QTS_FreeRuntime(e);
            }),
            i = new s.QuickJSRuntime({
              module: this.module,
              callbacks: this.callbacks,
              ffi: this.ffi,
              rt: t,
            });
          return (
            c(i, e), e.moduleLoader && i.setModuleLoader(e.moduleLoader), i
          );
        }
        newContext() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          const t = this.newRuntime(),
            i = t.newContext({
              ...e,
              ownedLifetimes: (0, a.concat)(t, e.ownedLifetimes),
            });
          return (t.context = i), i;
        }
        evalCode(e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          return o.Scope.withScope((i) => {
            const n = i.manage(this.newContext());
            h(n.runtime, t);
            const r = n.evalCode(e, "eval.js");
            if (
              (void 0 !== t.memoryLimitBytes && n.runtime.setMemoryLimit(-1),
              r.error)
            ) {
              throw n.dump(i.manage(r.error));
            }
            return n.dump(i.manage(r.value));
          });
        }
        getFFI() {
          return this.ffi;
        }
      };
    },
    46203: (e, t, i) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.QuickJSAsyncRuntime = void 0);
      const n = i(98277),
        r = i(69497),
        o = i(14309),
        s = i(95812);
      class a extends o.QuickJSRuntime {
        constructor(e) {
          super(e);
        }
        newContext() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if (e.intrinsics && e.intrinsics !== s.DefaultIntrinsics)
            throw new Error("TODO: Custom intrinsics are not supported yet");
          const t = new n.Lifetime(
              this.ffi.QTS_NewContext(this.rt.value),
              void 0,
              (e) => {
                this.contextMap.delete(e),
                  this.callbacks.deleteContext(e),
                  this.ffi.QTS_FreeContext(e);
              }
            ),
            i = new r.QuickJSAsyncContext({
              module: this.module,
              ctx: t,
              ffi: this.ffi,
              rt: this.rt,
              ownedLifetimes: [],
              runtime: this,
              callbacks: this.callbacks,
            });
          return this.contextMap.set(t.value, i), i;
        }
        setModuleLoader(e, t) {
          super.setModuleLoader(e, t);
        }
        setMaxStackSize(e) {
          return super.setMaxStackSize(e);
        }
      }
      t.QuickJSAsyncRuntime = a;
    },
    14309: (e, t, i) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.QuickJSRuntime = void 0);
      const n = i(72678),
        r = i(46953),
        o = i(50618),
        s = i(35541),
        a = i(39045),
        u = i(10302),
        l = i(95812);
      t.QuickJSRuntime = class {
        constructor(e) {
          var t;
          (this.scope = new a.Scope()),
            (this.contextMap = new Map()),
            (this.cToHostCallbacks = {
              shouldInterrupt: (e) => {
                if (e !== this.rt.value)
                  throw new Error(
                    "QuickJSContext instance received C -> JS interrupt with mismatched rt"
                  );
                const t = this.interruptHandler;
                if (!t)
                  throw new Error("QuickJSContext had no interrupt handler");
                return t(this) ? 1 : 0;
              },
              loadModuleSource: (0, n.maybeAsyncFn)(
                this,
                function* (e, t, i, n) {
                  var r;
                  const s = this.moduleLoader;
                  if (!s) throw new Error("Runtime has no module loader");
                  if (t !== this.rt.value)
                    throw new Error("Runtime pointer mismatch");
                  const a =
                    null !== (r = this.contextMap.get(i)) && void 0 !== r
                      ? r
                      : this.newContext({ contextPointer: i });
                  try {
                    const t = yield* e(s(n, a));
                    if ("object" === typeof t && "error" in t && t.error)
                      throw (
                        ((0, o.debugLog)(
                          "cToHostLoadModule: loader returned error",
                          t.error
                        ),
                        t.error)
                      );
                    const i =
                      "string" === typeof t ? t : "value" in t ? t.value : t;
                    return this.memory.newHeapCharPointer(i).value;
                  } catch (u) {
                    return (
                      (0, o.debugLog)("cToHostLoadModule: caught error", u),
                      a.throw(u),
                      0
                    );
                  }
                }
              ),
              normalizeModule: (0, n.maybeAsyncFn)(
                this,
                function* (e, t, i, n, r) {
                  var s;
                  const a = this.moduleNormalizer;
                  if (!a) throw new Error("Runtime has no module normalizer");
                  if (t !== this.rt.value)
                    throw new Error("Runtime pointer mismatch");
                  const u =
                    null !== (s = this.contextMap.get(i)) && void 0 !== s
                      ? s
                      : this.newContext({ contextPointer: i });
                  try {
                    const t = yield* e(a(n, r, u));
                    if ("object" === typeof t && "error" in t && t.error)
                      throw (
                        ((0, o.debugLog)(
                          "cToHostNormalizeModule: normalizer returned error",
                          t.error
                        ),
                        t.error)
                      );
                    const i = "string" === typeof t ? t : t.value;
                    return u.getMemory(this.rt.value).newHeapCharPointer(i)
                      .value;
                  } catch (l) {
                    return (
                      (0, o.debugLog)("normalizeModule: caught error", l),
                      u.throw(l),
                      0
                    );
                  }
                }
              ),
            }),
            null === (t = e.ownedLifetimes) ||
              void 0 === t ||
              t.forEach((e) => this.scope.manage(e)),
            (this.module = e.module),
            (this.memory = new u.ModuleMemory(this.module)),
            (this.ffi = e.ffi),
            (this.rt = e.rt),
            (this.callbacks = e.callbacks),
            this.scope.manage(this.rt),
            this.callbacks.setRuntimeCallbacks(
              this.rt.value,
              this.cToHostCallbacks
            ),
            (this.executePendingJobs = this.executePendingJobs.bind(this));
        }
        get alive() {
          return this.scope.alive;
        }
        dispose() {
          return this.scope.dispose();
        }
        newContext() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if (e.intrinsics && e.intrinsics !== l.DefaultIntrinsics)
            throw new Error("TODO: Custom intrinsics are not supported yet");
          const t = new a.Lifetime(
              e.contextPointer || this.ffi.QTS_NewContext(this.rt.value),
              void 0,
              (e) => {
                this.contextMap.delete(e),
                  this.callbacks.deleteContext(e),
                  this.ffi.QTS_FreeContext(e);
              }
            ),
            i = new r.QuickJSContext({
              module: this.module,
              ctx: t,
              ffi: this.ffi,
              rt: this.rt,
              ownedLifetimes: e.ownedLifetimes,
              runtime: this,
              callbacks: this.callbacks,
            });
          return this.contextMap.set(t.value, i), i;
        }
        setModuleLoader(e, t) {
          (this.moduleLoader = e),
            (this.moduleNormalizer = t),
            this.ffi.QTS_RuntimeEnableModuleLoader(
              this.rt.value,
              this.moduleNormalizer ? 1 : 0
            );
        }
        removeModuleLoader() {
          (this.moduleLoader = void 0),
            this.ffi.QTS_RuntimeDisableModuleLoader(this.rt.value);
        }
        hasPendingJob() {
          return Boolean(this.ffi.QTS_IsJobPending(this.rt.value));
        }
        setInterruptHandler(e) {
          const t = this.interruptHandler;
          (this.interruptHandler = e),
            t || this.ffi.QTS_RuntimeEnableInterruptHandler(this.rt.value);
        }
        removeInterruptHandler() {
          this.interruptHandler &&
            (this.ffi.QTS_RuntimeDisableInterruptHandler(this.rt.value),
            (this.interruptHandler = void 0));
        }
        executePendingJobs() {
          var e;
          let t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
          const i = this.memory.newMutablePointerArray(1),
            n = this.ffi.QTS_ExecutePendingJob(
              this.rt.value,
              null !== t && void 0 !== t ? t : -1,
              i.value.ptr
            ),
            r = i.value.typedArray[0];
          if ((i.dispose(), 0 === r))
            return (
              this.ffi.QTS_FreeValuePointerRuntime(this.rt.value, n),
              { value: 0 }
            );
          const o =
              null !== (e = this.contextMap.get(r)) && void 0 !== e
                ? e
                : this.newContext({ contextPointer: r }),
            s = o.getMemory(this.rt.value).heapValueHandle(n);
          if ("number" === o.typeof(s)) {
            const e = o.getNumber(s);
            return s.dispose(), { value: e };
          }
          return { error: Object.assign(s, { context: o }) };
        }
        setMemoryLimit(e) {
          if (e < 0 && -1 !== e)
            throw new Error(
              "Cannot set memory limit to negative number. To unset, pass -1"
            );
          this.ffi.QTS_RuntimeSetMemoryLimit(this.rt.value, e);
        }
        computeMemoryUsage() {
          const e = this.getSystemContext().getMemory(this.rt.value);
          return e.heapValueHandle(
            this.ffi.QTS_RuntimeComputeMemoryUsage(this.rt.value, e.ctx.value)
          );
        }
        dumpMemoryUsage() {
          return this.memory.consumeHeapCharPointer(
            this.ffi.QTS_RuntimeDumpMemoryUsage(this.rt.value)
          );
        }
        setMaxStackSize(e) {
          if (e < 0)
            throw new Error(
              "Cannot set memory limit to negative number. To unset, pass 0."
            );
          this.ffi.QTS_RuntimeSetMaxStackSize(this.rt.value, e);
        }
        assertOwned(e) {
          if (e.owner && e.owner.rt !== this.rt)
            throw new s.QuickJSWrongOwner(
              "Handle is not owned by this runtime: "
                .concat(e.owner.rt.value, " != ")
                .concat(this.rt.value)
            );
        }
        getSystemContext() {
          return (
            this.context ||
              (this.context = this.scope.manage(this.newContext())),
            this.context
          );
        }
      };
    },
    43946: (e, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.EvalFlags = t.assertSync = void 0),
        (t.assertSync = function (e) {
          return function () {
            const t = e(...arguments);
            if (t && "object" === typeof t && t instanceof Promise)
              throw new Error("Function unexpectedly returned a Promise");
            return t;
          };
        }),
        (t.EvalFlags = {
          JS_EVAL_TYPE_GLOBAL: 0,
          JS_EVAL_TYPE_MODULE: 1,
          JS_EVAL_TYPE_DIRECT: 2,
          JS_EVAL_TYPE_INDIRECT: 3,
          JS_EVAL_TYPE_MASK: 3,
          JS_EVAL_FLAG_STRICT: 8,
          JS_EVAL_FLAG_STRIP: 16,
          JS_EVAL_FLAG_COMPILE_ONLY: 32,
          JS_EVAL_FLAG_BACKTRACE_BARRIER: 64,
        });
    },
    95812: (e, t, i) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.concat = t.evalOptionsToFlags = t.DefaultIntrinsics = void 0);
      const n = i(43946);
      Symbol("Unstable");
      (t.DefaultIntrinsics = Symbol("DefaultIntrinsics")),
        (t.evalOptionsToFlags = function (e) {
          if ("number" === typeof e) return e;
          if (void 0 === e) return 0;
          const {
            type: t,
            strict: i,
            strip: r,
            compileOnly: o,
            backtraceBarrier: s,
          } = e;
          let a = 0;
          return (
            "global" === t && (a |= n.EvalFlags.JS_EVAL_TYPE_GLOBAL),
            "module" === t && (a |= n.EvalFlags.JS_EVAL_TYPE_MODULE),
            i && (a |= n.EvalFlags.JS_EVAL_FLAG_STRICT),
            r && (a |= n.EvalFlags.JS_EVAL_FLAG_STRIP),
            o && (a |= n.EvalFlags.JS_EVAL_FLAG_COMPILE_ONLY),
            s && (a |= n.EvalFlags.JS_EVAL_FLAG_BACKTRACE_BARRIER),
            a
          );
        }),
        (t.concat = function () {
          let e = [];
          for (var t = arguments.length, i = new Array(t), n = 0; n < t; n++)
            i[n] = arguments[n];
          for (const r of i) void 0 !== r && (e = e.concat(r));
          return e;
        });
    },
  },
]);
//# sourceMappingURL=https://statics-view.genially.com/view/static/js/113.277067bf.chunk.js.map
