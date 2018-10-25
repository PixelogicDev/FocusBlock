import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  let className = 'input';
  if (props.units) {
    className += ' input--has-units';
  }
  if (props.hasError) {
    className += ' input--has-error';
  }

  return(
    <div className={className}>
      <label className="input__label" htmlFor={props.id}>
        {props.label}
        {(props.sublabel && <span className="input__sublabel"> – {props.sublabel}</span>)}
      </label>
			<input 
				className={props.units ? 'input__field input__field--small' : 'input__field'}
				type={props.type}
				placeholder={props.placeholder}
				name={props.name}
				id={props.id}
				value={props.value}
        onChange={props.changed}
        onBlur={props.blurred} />
      {props.units && <div className="input__units">{props.units}</div>}
      {(props.hasError || props.hint) && 
        <div className="input__hint">
          {(props.hasError && props.errorMessage) ? props.errorMessage : props.hint}
        </div>
      }
      {props.suggestions &&
        <div className="input__suggestions">
          {props.suggestions.map((s, key) => 
            <button className="input__suggestion" onClick={props.suggestionClicked} value={s.value} key={key}>
              {s.title}
            </button>
          )}
        </div>
      }
		</div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  sublabel: PropTypes.string,
  placeholder: PropTypes.string,
  units: PropTypes.string,
  hint: PropTypes.string,
  suggestions: PropTypes.array,
  suggestionClicked: PropTypes.func,
  value: PropTypes.any,
  changed: PropTypes.func,
  blurred: PropTypes.func,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string
};

export default Input;