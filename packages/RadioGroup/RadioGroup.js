import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class RadioGroup extends Component {
    static displayName = 'RadioGroup'

    static defaultProps = {
        variant: 'default',
        size: 'normal',
        className: '', 
        children: null, 
        onChange: () => {}, 
        value: null, 
    }

    static propTypes = {
        variant: PropTypes.oneOf(['default']), 
        size: PropTypes.oneOf(['normal']), 
        className: PropTypes.string,
        children: PropTypes.node,
        onChange: PropTypes.func,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
    }

    constructor(props) {
        super(props)

        const { value } = this.props

        this.state = {
            value: value || this.defaultProps.value
        }
    }
    

    handleChange = (e) => {
        const { onChange } = this.props

        if (onChange) {
            onChange(e)
        } else {
            this.setState({ value: e.target.value })
        }
    }

    render() {
        const {
            children,
        } = this.props
        
        return (
            <form>
                <strong>I AM A RADIO GROUP</strong>
                <p>-----</p>

                {children.map((child) => {
                    let radioId = `checkbox-${Math.floor(Math.random() * 10000000)}`    
                    return React.cloneElement(child, { 
                        checked: this.state.value === child.props.value, 
                        handleChange: this.handleChange, 
                        value: child.props.value, 
                        key: radioId, 
                        id: radioId,
                    })
                })}    
            </form>
        )
    }
}