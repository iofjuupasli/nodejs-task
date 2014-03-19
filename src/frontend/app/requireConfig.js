/* global require */

var require = {
    paths: {
        'bootstrap': '../libs/bootstrap/dist/js/bootstrap.min',

        'durandal': '../libs/durandal/js',
        'plugins': '../libs/durandal/js/plugins',
        'transitions': '../libs/durandal/js/transitions',

        'jquery': '../libs/jquery/jquery.min',
        'knockout': '../libs/knockout.js/knockout',
        'text': '../libs/requirejs-text/text'
    },
    shim: {
        'bootstrap': ['jquery']
    }
};