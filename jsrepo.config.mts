import { defineConfig } from 'jsrepo';

export default defineConfig({
    registries: ['https://reactbits.dev/registry/react'],
    paths: {
        'text-animations/*': 'src/components/reactbits/text/',
        'animations/*': 'src/components/reactbits/animations/',
        'backgrounds/*': 'src/components/reactbits/backgrounds/',
    },
});