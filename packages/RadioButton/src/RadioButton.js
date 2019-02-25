import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class RadioButton extends Component {
    static displayName = 'RadioButton'

    // should i make default value a more complicated string, so that it works??
    static defaultProps = {
        checked: false, 
        disabled: false,
        className: '', 
        children: null, 
        onChange: () => {},
        value: '',
        id: '', 
        name: ''
    }

    static propTypes = {
        checked: PropTypes.bool, 
        disabled: PropTypes.bool, 
        className: PropTypes.string,
        children: PropTypes.node,
        onChange: PropTypes.func,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]), 
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), 
        name: PropTypes.string,
    } 

    render() {
        const { 
            children, 
            className,
            handleChange,
            value, 
            checked, 
            disabled,
            id,
            name,
            ...rest
        } = this.props

        return (        
            <label
                htmlFor={id}
                disabled={disabled}>

                <input 
                    {...rest}
                    id={id}
                    name={name}
                    type="radio" 
                    className={className}
                    onChange={handleChange} 
                    value={value} 
                    checked={checked} 
                    aria-checked={checked}
                    disabled={disabled}
                    aria-disabled={disabled}/>
                
                {children}
                
            </label>
    )
    }
}