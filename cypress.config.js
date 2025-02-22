import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    projectId: 'or4g19',
    record: true, 
    video: true, 
    setupNodeEvents(on, config) {
     
    },
  },
});
