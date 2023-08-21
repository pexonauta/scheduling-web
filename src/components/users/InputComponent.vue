<template>
    <input :type="type" :name="name" :id="id" :value="value" :placeholder="placeholder" required/>
</template>
<script>
export default {
    name: 'InputComponent',
    props: {
        name: String,
        type: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        }
        
    },
}

</script>
<style lang="scss" >
.form-input-nb {
    width: 45%;
    padding: 4px;
    border-radius: 5px;

}
.form-input-nb::placeholder {
    font-size: 1.1em;
    font-weight: bold;
}

</style>