'use strict';

var hg = require('mercury');
var h = require('mercury').h;

module.exports = render;

function render(state) {
    return state.registerMode ?
        renderRegister(state) :
        renderLogin(state);
}

function renderLogin(state) {
    var channels = state.channels;

    return h('div', {
        'ev-event': hg.sendSubmit(channels.login)
    }, [
        h('fieldset', [
            h('legend', 'Login Form'),
            labeledInput('Email: ', {
                name: 'email',
                error: state.emailError
            }),
            labeledInput('Password: ', {
                name: 'password',
                type: 'password'
            }),
            h('div', [
                h('button', {
                    'ev-click': hg.send(channels.switchMode,
                        !state.registerMode)
                }, 'Register new User'),
                h('button', 'Login')
            ])
        ])
    ]);
}

function renderRegister(state) {
    var channels = state.channels;

    return h('div', {
        'ev-event': hg.sendSubmit(channels.register)
    }, [
        h('fieldset', [
            h('legend', 'Register Form'),
            labeledInput('Email: ', {
                name: 'email',
                error: state.emailError
            }),
            labeledInput('Password: ', {
                name: 'password',
                type: 'password',
                error: state.passwordError
            }),
            labeledInput('Repeat Password: ', {
                name: 'repeatPassword',
                type: 'password'
            }),
            h('div', [
                h('button', {
                    'ev-click': hg.send(channels.switchMode,
                        !state.registerMode)
                }, 'Login into existing User'),
                h('button', 'Register')
            ])
        ])
    ]);
}

function labeledInput(label, opts) {
    opts.className = opts.error ?
        'error' : '';

    return h('div', [
        h('label', {
            className: opts.error ? 'error' : ''
        }, [
            label,
            h('input', opts)
        ]),
        h('div', {
            className: 'error'
        }, [
            opts.error
        ])
    ]);
}
