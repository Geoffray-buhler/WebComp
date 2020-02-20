// WebComponent responsible for feching query results and display it in a list.
// Should be usable as an input in a form, or to react on DOM events.

class MyAutoCompletion extends HTMLElement {

    lastSearch;

    $root;
    $innerInput;
    $list;

    constructor(){
        super();

        this.$root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        this.init();
    }

    init(){
        this.$innerInput = document.createElement('input', { class : 'w-100' });
        this.$root.appendChild(this.$innerInput);

        this.$innerInput.addEventListener('input', e => this.handleChange(e));

        this.$list = document.createElement('ul',{ class : 'list-group' });
        this.$root.appendChild(this.$list);
    }

    handleChange(e){
        const value = this.$innerInput.value;
        const valuelength = this.getLimitValue();
        if(this.lastSearch != value && value.length >= valuelength){
            this.updateList(value);
        }
    }

    handleSelect(patient){

        const event = new CustomEvent("select", {
            detail: {
              patient
            }
          });
          this.dispatchEvent(event);
    }

    updateList(searchTerm){
        const uri = this.getSearchURI(searchTerm);
        fetch(uri)
            .then(res => res.json())
            .then(data => this.updateFromData(data));
    }

    updateFromData(data) {
        this.$list.innerHTML = '';
        data.forEach(patient => {
            const $li = document.createElement('li',{ class : 'list-group-item' });
            $li.textContent = patient.firstname + ' ' + patient.lastname;
            this.$list.appendChild($li);

            $li.addEventListener('click', () => this.handleSelect(patient));
        })
    }

    getSearchURI(searchTerm){
        const baseURI = this.getBaseURI();
        const field = this.getQueryField();
        return `${baseURI}?${field}=${searchTerm}`;
    }

    getBaseURI(){
        return this.getSafeAttribute('url');
    }

    getQueryField(){
        return this.getSafeAttribute('field', 'q');
    }

    getLimitValue(){
        return this.getAttribute('limit-value');
    }

    getSafeAttribute(shortName, defaultValue = ""){
        return this.hasAttribute('query-'+shortName) ? this.getAttribute('query-'+shortName) : defaultValue;
    }

}

window.customElements.define('my-autocomplete', MyAutoCompletion);