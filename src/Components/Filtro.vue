<script>
    
</script>

<template>
    <div class="filter" app>
        <label for="filtro1">filtro 1</label>
        <input type="text" name="filtro1" id="filtro1" placeholder="filtro 1">
        <label for="filtro2">filtro 2</label>
        <input type="text" name="filtro2" id="filtro2" placeholder="filtro 2">
    </div>
</template>

<style>
    .filter{
        margin: 15px 0;
        display: flex;
        justify-content: center;
    }
    .filter label {
        margin: 5px;
    }
    .filter input {
        background-color: grey;
        border-radius: 10px;
        color: white;
        
    }
    
</style>