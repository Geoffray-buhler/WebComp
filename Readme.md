# Installation

### Sur votre HTML ou PHpouts

Au niveau des déclarations de scripts mettre ce code !

```
<script type="text/javascript"
src="./VotreNomDeDossier/MyAutocompletion.js"></script>
    <script type="text/javascript">
        const $autoComp = document.querySelector('my-autocomplete');
        $autoComp.addEventListener('select', (evt) => {
            const patient = evt.detail.patient;
            console.log(patient);
        }
```

Là ou vous voulez mettre votre components

```
 <my-autocomplete class="form-control" limit-value=0 query-url="search.php" query-field="q"></my-autocomplete>
```

## Voila bonne chance

