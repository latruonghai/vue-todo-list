<script lang="ts">
export default {
    emits: ['inFocus', 'submit'],
    setup(props: any, ctx: any) {
        ctx.emit('submit');
    }
};
</script>

<template>
    <!-- In CustomComponent -->
    <button @click="$emit('increaseBy', 1)">Increase by 1</button>
    <!-- CustomComponent -->
    <CustomComponent @increase-by="(n) => (count += n)" />
</template>
