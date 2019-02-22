import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class RadioButton extends Component {
    static displayName = 'RadioButton'

    static defaultProps = {
        checked: false, 
        disabled: false,
        className: '', 
        children: null, 
        onChange: () => {},
        value: '',
        id: '', 
    }

    static propTypes = {
        checked: PropTypes.bool, 
        disabled: PropTypes.bool, 
        className: PropTypes.string,
        children: PropTypes.node,
        onChange: PropTypes.func,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]), 
        id: PropTypes.string
    } 

    render() {
        const { 
            children, 
            className,
            handleChange,
            value, 
            checked, 
            disabled,
            ...rest
        } = this.props

        return (
            <div>
                <label>{children}</label>
                <input 
                    {...rest}
                    type="radio" 
                    className={className}
                    onChange={handleChange} 
                    value={value} 
                    checked={checked} 
                    aria-checked={checked}
                    disabled={disabled}
                    aria-disabled={disabled}
                    />
            </div>
        )
    }
}