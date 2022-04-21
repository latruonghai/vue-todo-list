<script lang="ts">
export default {
    setup(props: any, context: any) {
        // Attributes (Non-reactive object, equivalent to $attrs)
        console.log(context.attrs);

        // Slots (Non-reactive object, equivalent to $slots)
        console.log(context.slots);

        // Emit events (Function, equivalent to $emit)
        console.log(context.emit);

        // Expose public properties (Function)
        console.log(context.expose);
    }
};
</script>

<template>
    <div v-demo="{ color: 'white', text: 'hello!' }"></div>
</template>
