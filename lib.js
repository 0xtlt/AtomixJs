function G(P){return class extends P{#B=[];#h={};lazyload=!1;loaded=!1;constructor(...h){super(...h)}connectedCallback(){if(this.lazyload){const h=new IntersectionObserver((B)=>{B.forEach((E)=>{if(E.isIntersecting)this.initComponent(),h.unobserve(this)})},{threshold:0.1});h.observe(this);return}setTimeout(()=>this.initComponent(),1)}disconnectedCallback(){if(this.loaded)this.onDestroy?.(),this.clearCycles?.()}initComponent(){this.loaded=!0,this.start?.()}stateSubscribe(h,B){this.cycle(()=>h(B))}cycle(h){let B=h();if(B instanceof Promise)B.then((E)=>this.#B.push(E));else this.#B.push(B)}clearCycles(){this.#B.map((B)=>{const E=B();if(E instanceof Promise)E.then(()=>null)}),Object.keys(this.#h).forEach((B)=>{const E=this.#h[B]();if(E instanceof Promise)E.then(()=>null)}),this.#B=[],this.#h={}}namedCycle(h,B){if(this.#h[h]){const I=this.#h[h]();if(I instanceof Promise)I.then(()=>null)}let E=B();if(E instanceof Promise)E.then((I)=>this.#h[h]=I);else this.#h[h]=E}logger(...h){console.info(`[${this.tagName}]`,...h)}}}var M=G(HTMLElement);var z=function(P,h,B="ram"){const E={};let I=B==="ram"?P:D(h,P,B);function D(L,O,j){if(!L)return O;const q=(j==="local"?localStorage:sessionStorage).getItem(L);return q?JSON.parse(q):O}function F(L,O,j){if(j==="ram"||!L)return;(j==="local"?localStorage:sessionStorage).setItem(L,JSON.stringify(O))}return{get:()=>I,set:(L)=>{const O=I;I=L,F(h,L,B),Object.values(E).forEach((j)=>j(I,O))},subscribe:(L)=>{const O=Math.random().toString(36).substring(2,9);return E[O]=L,L(I,I),()=>{delete E[O]}}}};function R(P){return z(P)}function U(P,h,B){return z(h,P,B)}export{R as useAtomixState,U as useAtomixBrowserState,G as makeAtomixComponent,M as AHTMLElement};

//# debugId=21A15DBA7811F94F64756e2164756e21
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2F0b21peENvbXBvbmVudC50cyIsICJzcmMvYXRvbWl4U3RhdGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbCiAgICAiaW1wb3J0IHsgdHlwZSBBZGRDeWNsZUZuIH0gZnJvbSBcIi4vY3ljbGVcIjtcblxuZXhwb3J0IGNvbnN0IEFIVE1MRWxlbWVudCA9IG1ha2VBdG9taXhDb21wb25lbnQoSFRNTEVsZW1lbnQpO1xuZXhwb3J0IHR5cGUgQ29tcG9uZW50VHlwZSA9IEluc3RhbmNlVHlwZTx0eXBlb2YgQUhUTUxFbGVtZW50PjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VBdG9taXhDb21wb25lbnQ8XG4gIEVsZW1lbnQgZXh0ZW5kcyB7XG4gICAgbmV3ICguLi5hcmdzOiBhbnlbXSk6IEhUTUxFbGVtZW50O1xuICB9XG4+KGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgZWxlbWVudCB7XG4gICAgLy8gQ3ljbGVzIHN5c3RlbVxuICAgICNfY3ljbGVzOiBBcnJheTwoKSA9PiBhbnk+ID0gW107XG4gICAgI19uYW1lZEN5Y2xlczogUmVjb3JkPHN0cmluZywgKCkgPT4gYW55PiA9IHt9O1xuICAgIGxhenlsb2FkOiBib29sZWFuID0gZmFsc2U7XG4gICAgbG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgc3VwZXIoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICBpZiAodGhpcy5sYXp5bG9hZCkge1xuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihcbiAgICAgICAgICAoZW50cmllcykgPT4ge1xuICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRDb21wb25lbnQoKTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci51bm9ic2VydmUodGhpcyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgeyB0aHJlc2hvbGQ6IDAuMSB9XG4gICAgICAgICk7XG5cbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pbml0Q29tcG9uZW50KCksIDEpO1xuICAgIH1cblxuICAgIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgaWYgKHRoaXMubG9hZGVkKSB7XG4gICAgICAgIHRoaXMub25EZXN0cm95Py4oKTtcbiAgICAgICAgdGhpcy5jbGVhckN5Y2xlcz8uKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW5pdENvbXBvbmVudCgpIHtcbiAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuc3RhcnQ/LigpO1xuICAgIH1cblxuICAgIHN0YXRlU3Vic2NyaWJlPFR5cGU+KFxuICAgICAgc3RhdGVTdWJzY3JpYmVDYWxsYmFjazogKFxuICAgICAgICBjYjogKHZhbHVlOiBUeXBlLCBvbGRWYWx1ZTogVHlwZSkgPT4gdm9pZCB8IFByb21pc2U8dm9pZD5cbiAgICAgICkgPT4gKCkgPT4gdm9pZCxcbiAgICAgIGNhbGxiYWNrOiAodmFsdWU6IFR5cGUsIG9sZFZhbHVlOiBUeXBlKSA9PiB2b2lkIHwgUHJvbWlzZTx2b2lkPlxuICAgICkge1xuICAgICAgdGhpcy5jeWNsZSgoKSA9PiBzdGF0ZVN1YnNjcmliZUNhbGxiYWNrKGNhbGxiYWNrKSk7XG4gICAgfVxuXG4gICAgLy8gQ3ljbGVzXG4gICAgY3ljbGUoY2I6IEFkZEN5Y2xlRm4pIHtcbiAgICAgIGxldCBmbiA9IGNiKCk7XG5cbiAgICAgIGlmIChmbiBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgZm4udGhlbigoZm4pID0+IHRoaXMuI19jeWNsZXMucHVzaChmbikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4jX2N5Y2xlcy5wdXNoKGZuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhckN5Y2xlcygpIHtcbiAgICAgIHRoaXMuI19jeWNsZXMubWFwKChjYikgPT4ge1xuICAgICAgICBjb25zdCByZXMgPSBjYigpO1xuICAgICAgICBpZiAocmVzIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgIHJlcy50aGVuKCgpID0+IG51bGwpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuI19uYW1lZEN5Y2xlcyk7XG4gICAgICAvLyB1bm1vdW50IG5hbWVkIGN5Y2xlc1xuICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgcmVzID0gdGhpcy4jX25hbWVkQ3ljbGVzW2tleV0oKTtcbiAgICAgICAgaWYgKHJlcyBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICByZXMudGhlbigoKSA9PiBudWxsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuI19jeWNsZXMgPSBbXTtcbiAgICAgIHRoaXMuI19uYW1lZEN5Y2xlcyA9IHt9O1xuICAgIH1cblxuICAgIC8vIE5hbWVkIGN5Y2xlc1xuICAgIG5hbWVkQ3ljbGUobmFtZTogc3RyaW5nLCBjYjogQWRkQ3ljbGVGbikge1xuICAgICAgLy8gdW5tb3V0IHByZXZpb3VzIGN5Y2xlXG4gICAgICBpZiAodGhpcy4jX25hbWVkQ3ljbGVzW25hbWVdKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IHRoaXMuI19uYW1lZEN5Y2xlc1tuYW1lXSgpO1xuICAgICAgICBpZiAocmVzIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgIHJlcy50aGVuKCgpID0+IG51bGwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsZXQgZm4gPSBjYigpO1xuXG4gICAgICBpZiAoZm4gaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIGZuLnRoZW4oKGZuKSA9PiAodGhpcy4jX25hbWVkQ3ljbGVzW25hbWVdID0gZm4pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuI19uYW1lZEN5Y2xlc1tuYW1lXSA9IGZuO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIExpZmVjeWNsZVxuICAgIHN0YXJ0PygpOiB2b2lkO1xuICAgIG9uRGVzdHJveT8oKTogdm9pZDtcblxuICAgIGxvZ2dlciguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgY29uc29sZS5pbmZvKGBbJHt0aGlzLnRhZ05hbWV9XWAsIC4uLmFyZ3MpO1xuICAgIH1cbiAgfTtcbn1cbiIsCiAgIi8vIERlZmluZSBwb3NzaWJsZSBzdG9yYWdlIHR5cGVzXG5leHBvcnQgdHlwZSBTdG9yYWdlVHlwZSA9IFwibG9jYWxcIiB8IFwic2Vzc2lvblwiIHwgXCJyYW1cIjtcblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RhdGUgbWFuYWdlbWVudCBzeXN0ZW0gd2l0aCBvcHRpb25hbCBwZXJzaXN0ZW5jZS5cbiAqIEBwYXJhbSBpbml0aWFsVmFsdWUgLSBUaGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGUgc3RhdGUuXG4gKiBAcGFyYW0ga2V5IC0gT3B0aW9uYWwga2V5IGZvciBzdG9yaW5nIHRoZSBzdGF0ZSBpbiBsb2NhbFN0b3JhZ2Ugb3Igc2Vzc2lvblN0b3JhZ2UuXG4gKiBAcGFyYW0gc3RvcmFnZVR5cGUgLSBEZWZpbmVzIHdoZXJlIHRoZSBzdGF0ZSBpcyBzdG9yZWQ6IGluIFJBTSwgbG9jYWxTdG9yYWdlLCBvciBzZXNzaW9uU3RvcmFnZS5cbiAqIEByZXR1cm5zIEFuIG9iamVjdCBjb250YWluaW5nIGZ1bmN0aW9ucyB0byBnZXQgYW5kIHNldCB0aGUgc3RhdGUsIGFuZCB0byBzdWJzY3JpYmUgdG8gc3RhdGUgY2hhbmdlcy5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXRvbWl4U3RhdGU8VHlwZT4oXG4gIGluaXRpYWxWYWx1ZTogVHlwZSxcbiAga2V5Pzogc3RyaW5nLFxuICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUgPSBcInJhbVwiXG4pIHtcbiAgY29uc3QgbGlzdGVuZXJzOiBSZWNvcmQ8XG4gICAgc3RyaW5nLFxuICAgICh2YWx1ZTogVHlwZSwgb2xkVmFsdWU6IFR5cGUpID0+IHZvaWQgfCBQcm9taXNlPHZvaWQ+XG4gID4gPSB7fTtcbiAgbGV0IHZhbHVlID1cbiAgICBzdG9yYWdlVHlwZSA9PT0gXCJyYW1cIlxuICAgICAgPyBpbml0aWFsVmFsdWVcbiAgICAgIDogZ2V0U3RvcmVkVmFsdWUoa2V5LCBpbml0aWFsVmFsdWUsIHN0b3JhZ2VUeXBlKTtcblxuICAvLyBSZXRyaWV2ZXMgc3RvcmVkIHZhbHVlIGZyb20gbG9jYWxTdG9yYWdlIG9yIHNlc3Npb25TdG9yYWdlLlxuICBmdW5jdGlvbiBnZXRTdG9yZWRWYWx1ZShcbiAgICBrZXk6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICBkZWZhdWx0VmFsdWU6IFR5cGUsXG4gICAgdHlwZTogU3RvcmFnZVR5cGVcbiAgKTogVHlwZSB7XG4gICAgaWYgKCFrZXkpIHJldHVybiBkZWZhdWx0VmFsdWU7XG5cbiAgICBjb25zdCBpdGVtID0gKHR5cGUgPT09IFwibG9jYWxcIiA/IGxvY2FsU3RvcmFnZSA6IHNlc3Npb25TdG9yYWdlKS5nZXRJdGVtKFxuICAgICAga2V5XG4gICAgKTtcbiAgICByZXR1cm4gaXRlbSA/IEpTT04ucGFyc2UoaXRlbSkgOiBkZWZhdWx0VmFsdWU7XG4gIH1cblxuICAvLyBTdG9yZXMgdGhlIHZhbHVlIGluIGxvY2FsU3RvcmFnZSBvciBzZXNzaW9uU3RvcmFnZS5cbiAgZnVuY3Rpb24gc3RvcmVWYWx1ZShcbiAgICBrZXk6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICBuZXdWYWx1ZTogVHlwZSxcbiAgICB0eXBlOiBTdG9yYWdlVHlwZVxuICApIHtcbiAgICBpZiAodHlwZSA9PT0gXCJyYW1cIiB8fCAha2V5KSByZXR1cm47XG5cbiAgICBjb25zdCBzdG9yYWdlID0gdHlwZSA9PT0gXCJsb2NhbFwiID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XG4gICAgc3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpKTtcbiAgfVxuXG4gIGNvbnN0IGdldFZhbHVlID0gKCkgPT4gdmFsdWU7XG4gIGNvbnN0IHNldFZhbHVlID0gKG5ld1ZhbHVlOiBUeXBlKSA9PiB7XG4gICAgY29uc3Qgb2xkVmFsdWUgPSB2YWx1ZTtcbiAgICB2YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIHN0b3JlVmFsdWUoa2V5LCBuZXdWYWx1ZSwgc3RvcmFnZVR5cGUpO1xuICAgIE9iamVjdC52YWx1ZXMobGlzdGVuZXJzKS5mb3JFYWNoKChjYikgPT4gY2IodmFsdWUsIG9sZFZhbHVlKSk7XG4gIH07XG5cbiAgLy8gU3Vic2NyaWJlcyBhIGNhbGxiYWNrIHRvIHN0YXRlIGNoYW5nZXMuXG4gIGNvbnN0IHN1YnNjcmliZSA9IChcbiAgICBjYjogKHZhbHVlOiBUeXBlLCBvbGRWYWx1ZTogVHlwZSkgPT4gdm9pZCB8IFByb21pc2U8dm9pZD5cbiAgKSA9PiB7XG4gICAgY29uc3QgaWQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgOSk7XG4gICAgbGlzdGVuZXJzW2lkXSA9IGNiO1xuICAgIGNiKHZhbHVlLCB2YWx1ZSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRlbGV0ZSBsaXN0ZW5lcnNbaWRdO1xuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0OiBnZXRWYWx1ZSwgc2V0OiBzZXRWYWx1ZSwgc3Vic2NyaWJlIH0gYXMgY29uc3Q7XG59XG5cbi8qKlxuICogSG9vayBmb3IgdXNpbmcgc3RhdGUgbWFuYWdlZCBieSBjcmVhdGVBdG9taXhTdGF0ZSBpbiBtZW1vcnkuXG4gKiBAcGFyYW0gaW5pdGlhbFZhbHVlIC0gVGhlIGluaXRpYWwgdmFsdWUgb2YgdGhlIHN0YXRlLlxuICogQHJldHVybnMgQW4gb2JqZWN0IGNvbnRhaW5pbmcgZnVuY3Rpb25zIHRvIGdldCBhbmQgc2V0IHRoZSBzdGF0ZSwgYW5kIHRvIHN1YnNjcmliZSB0byBzdGF0ZSBjaGFuZ2VzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlQXRvbWl4U3RhdGU8VHlwZT4oaW5pdGlhbFZhbHVlOiBUeXBlKSB7XG4gIHJldHVybiBjcmVhdGVBdG9taXhTdGF0ZShpbml0aWFsVmFsdWUpO1xufVxuXG4vKipcbiAqIEhvb2sgZm9yIHVzaW5nIHN0YXRlIG1hbmFnZWQgYnkgY3JlYXRlQXRvbWl4U3RhdGUgd2l0aCBicm93c2VyIHN0b3JhZ2UuXG4gKiBAcGFyYW0ga2V5IC0gS2V5IGZvciBzdG9yaW5nIHRoZSBzdGF0ZSBpbiBsb2NhbFN0b3JhZ2Ugb3Igc2Vzc2lvblN0b3JhZ2UuXG4gKiBAcGFyYW0gaW5pdGlhbFZhbHVlIC0gVGhlIGluaXRpYWwgdmFsdWUgb2YgdGhlIHN0YXRlLlxuICogQHBhcmFtIHN0b3JhZ2VUeXBlIC0gVHlwZSBvZiBicm93c2VyIHN0b3JhZ2UgdG8gdXNlLlxuICogQHJldHVybnMgQSB0dXBsZSBjb250YWluaW5nIGZ1bmN0aW9ucyB0byBnZXQgYW5kIHNldCB0aGUgc3RhdGUsIGFuZCB0byBzdWJzY3JpYmUgdG8gc3RhdGUgY2hhbmdlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUF0b21peEJyb3dzZXJTdGF0ZTxUeXBlPihcbiAga2V5OiBzdHJpbmcsXG4gIGluaXRpYWxWYWx1ZTogVHlwZSxcbiAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlXG4pIHtcbiAgcmV0dXJuIGNyZWF0ZUF0b21peFN0YXRlKGluaXRpYWxWYWx1ZSwga2V5LCBzdG9yYWdlVHlwZSk7XG59XG4iCiAgXSwKICAibWFwcGluZ3MiOiAiQUFLTyxTQUFTLENBSWYsQ0FBQyxFQUFrQixDQUNsQixPQUFPLGNBQWMsQ0FBUSxDQUUzQixHQUE2QixDQUFDLEVBQzlCLEdBQTJDLENBQUMsRUFDNUMsU0FBb0IsR0FDcEIsT0FBa0IsR0FFbEIsV0FBVyxJQUFJLEVBQWEsQ0FDMUIsTUFBTSxHQUFHLENBQUksRUFHZixpQkFBaUIsRUFBRyxDQUNsQixHQUFJLEtBQUssU0FBVSxDQUNqQixNQUFNLEVBQVcsSUFBSSxxQkFDbkIsQ0FBQyxJQUFZLENBQ1gsRUFBUSxRQUFRLENBQUMsSUFBVSxDQUN6QixHQUFJLEVBQU0sZUFDUixLQUFLLGNBQWMsRUFDbkIsRUFBUyxVQUFVLElBQUksRUFFMUIsR0FFSCxDQUFFLFVBQVcsR0FBSSxDQUNuQixFQUVBLEVBQVMsUUFBUSxJQUFJLEVBRXJCLE9BR0YsV0FBVyxJQUFNLEtBQUssY0FBYyxFQUFHLENBQUMsRUFHMUMsb0JBQW9CLEVBQUcsQ0FDckIsR0FBSSxLQUFLLE9BQ1AsS0FBSyxZQUFZLEVBQ2pCLEtBQUssY0FBYyxFQUl2QixhQUFhLEVBQUcsQ0FDZCxLQUFLLE9BQVMsR0FDZCxLQUFLLFFBQVEsRUFHZixjQUFvQixDQUNsQixFQUdBLEVBQ0EsQ0FDQSxLQUFLLE1BQU0sSUFBTSxFQUF1QixDQUFRLENBQUMsRUFJbkQsS0FBSyxDQUFDLEVBQWdCLENBQ3BCLElBQUksRUFBSyxFQUFHLEVBRVosR0FBSSxhQUFjLFFBQ2hCLEVBQUcsS0FBSyxDQUFDLElBQU8sS0FBSyxHQUFTLEtBQUssQ0FBRSxDQUFDLE1BRXRDLE1BQUssR0FBUyxLQUFLLENBQUUsRUFJekIsV0FBVyxFQUFHLENBQ1osS0FBSyxHQUFTLElBQUksQ0FBQyxJQUFPLENBQ3hCLE1BQU0sRUFBTSxFQUFHLEVBQ2YsR0FBSSxhQUFlLFFBQ2pCLEVBQUksS0FBSyxJQUFNLElBQUksRUFFdEIsRUFFWSxPQUFPLEtBQUssS0FBSyxFQUFhLEVBRXRDLFFBQVEsQ0FBQyxJQUFRLENBQ3BCLE1BQU0sRUFBTSxLQUFLLEdBQWMsR0FBSyxFQUNwQyxHQUFJLGFBQWUsUUFDakIsRUFBSSxLQUFLLElBQU0sSUFBSSxFQUV0QixFQUVELEtBQUssR0FBVyxDQUFDLEVBQ2pCLEtBQUssR0FBZ0IsQ0FBQyxFQUl4QixVQUFVLENBQUMsRUFBYyxFQUFnQixDQUV2QyxHQUFJLEtBQUssR0FBYyxHQUFPLENBQzVCLE1BQU0sRUFBTSxLQUFLLEdBQWMsR0FBTSxFQUNyQyxHQUFJLGFBQWUsUUFDakIsRUFBSSxLQUFLLElBQU0sSUFBSSxFQUd2QixJQUFJLEVBQUssRUFBRyxFQUVaLEdBQUksYUFBYyxRQUNoQixFQUFHLEtBQUssQ0FBQyxJQUFRLEtBQUssR0FBYyxHQUFRLENBQUcsTUFFL0MsTUFBSyxHQUFjLEdBQVEsRUFRL0IsTUFBTSxJQUFJLEVBQWEsQ0FDckIsUUFBUSxLQUFLLElBQUksS0FBSyxXQUFZLEdBQUcsQ0FBSSxFQUU3QyxFQXZISyxJQUFNLEVBQWUsRUFBb0IsV0FBV0FDUTNELElBQVMsVUFBdUIsQ0FDOUIsRUFDQSxFQUNBLEVBQTJCLE1BQzNCLENBQ0EsTUFBTSxFQUdGLENBQUMsRUFDTCxJQUFJLEVBQ0YsSUFBZ0IsTUFDWixFQUNBLEVBQWUsRUFBSyxFQUFjLENBQVcsRUFHbkQsU0FBUyxDQUFjLENBQ3JCLEVBQ0EsRUFDQSxFQUNNLENBQ04sSUFBSyxFQUFLLE9BQU8sRUFFakIsTUFBTSxHQUFRLElBQVMsUUFBVSxhQUFlLGdCQUFnQixRQUM5RCxDQUNGLEVBQ0EsT0FBTyxFQUFPLEtBQUssTUFBTSxDQUFJLEVBQUksRUFJbkMsU0FBUyxDQUFVLENBQ2pCLEVBQ0EsRUFDQSxFQUNBLENBQ0EsR0FBSSxJQUFTLFFBQVUsRUFBSyxPQUc1QixDQURnQixJQUFTLFFBQVUsYUFBZSxnQkFDMUMsUUFBUSxFQUFLLEtBQUssVUFBVSxDQUFRLENBQUMsRUF1Qi9DLE1BQU8sQ0FBRSxJQXBCUSxJQUFNLEVBb0JDLElBbkJQLENBQUMsSUFBbUIsQ0FDbkMsTUFBTSxFQUFXLEVBQ2pCLEVBQVEsRUFDUixFQUFXLEVBQUssRUFBVSxDQUFXLEVBQ3JDLE9BQU8sT0FBTyxDQUFTLEVBQUUsUUFBUSxDQUFDLElBQU8sRUFBRyxFQUFPLENBQVEsQ0FBQyxHQWV2QixVQVhyQixDQUNoQixJQUNHLENBQ0gsTUFBTSxFQUFLLEtBQUssT0FBTyxFQUFFLFNBQVMsRUFBRSxFQUFFLFVBQVUsRUFBRyxDQUFDLEVBR3BELE9BRkEsRUFBVSxHQUFNLEVBQ2hCLEVBQUcsRUFBTyxDQUFLLEVBQ1IsSUFBTSxDQUNYLE9BQU8sRUFBVSxJQUk0QixHQVE1QyxTQUFTLENBQW9CLENBQUMsRUFBb0IsQ0FDdkQsT0FBTyxFQUFrQixDQUFZLEVBVWhDLFNBQVMsQ0FBMkIsQ0FDekMsRUFDQSxFQUNBLEVBQ0EsQ0FDQSxPQUFPLEVBQWtCLEVBQWMsRUFBSyxDQUFXIiwKICAiZGVidWdJZCI6ICIyMUExNURCQTc4MTFGOTRGNjQ3NTZlMjE2NDc1NmUyMSIsCiAgIm5hbWVzIjogW10KfQ==
