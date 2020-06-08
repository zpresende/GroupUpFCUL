import React from 'react';

import { Container, InputField, Info, Select, Textarea } from './styles';
import { FaAngleDown } from 'react-icons/fa';

function Input({
	id,
	type,
	label,
	validation,
	error,
	info,
	change,
	value,
	danger,
	options,
}) {
	const inputs = {
		text: <InputField type={type} id={id} onChange={change} value={value} />,
		select: options && (
			<Select>
				<span>
					<FaAngleDown />
				</span>
				<select id={id} onChange={change} danger={danger} value={value}>
					{options.map((option) => (
						<option
							key={`option${option.value}${option.text}${id}`}
							value={option.value}
						>
							{option.text}
						</option>
					))}
				</select>
			</Select>
		),
		textarea: <Textarea id={id} onChange={change} value={value}></Textarea>,
		number: <InputField type={type} id={id} onChange={change} value={value} />,
		'datetime-local': (
			<InputField type={type} id={id} onChange={change} value={value} />
		),
	};
	return (
		<Container type={type} error={error}>
			<label htmlFor={id}>
				{label}:{validation.required && ' *'}
			</label>
			{inputs[type]}
			<Info error={error}>{info}</Info>
		</Container>
	);
}

export default Input;
