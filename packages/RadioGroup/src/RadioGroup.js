import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RadioButton from '../../RadioButton/src/index'



export default class RadioGroup extends Component {
    static displayName = 'RadioGroup'

    static defaultProps = {
        variant: 'default',
        size: 'normal',
        className: ''
    }

    static propTypes = {
        variant: PropTypes.oneOf(['default']), 
        size: PropTypes.oneOf(['normal']), 
        className: PropTypes.string,
    }

    state = { 
        value: this.props.value
    }

    handleChange = (e) => {
        const { onChange, value } = this.props

        if (onChange) {
            onChange(e)
        } 
        
        if (!value) {
            this.setState({ value: e.target.value })
        }
    }

    render() {
        const {
            children,
            name
        } = this.props
   
        const renderChildren = React.Children.map(children, (child, index) => {
            if (child.type !== RadioButton) {
                return child
            } 

            return React.cloneElement(child, {
                checked: this.state.value === child.props.value, 
                value: child.props.value, 
                handleChange: this.handleChange, 
                id: index,
                name,
            })
        })

        return (
            <form>
                {renderChildren}
            </form>
        )
    }
}