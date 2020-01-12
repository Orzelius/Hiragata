const purgecss = require('@fullhuman/postcss-purgecss')({

  // Specify the paths to all of the template files in your project 
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.tsx'
    // etc.
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

module.exports = (ctx) => {
  return {
    plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
      ...(ctx.webpack.mode === 'production') ? [purgecss] : [purgecss]
    ]
  }
}