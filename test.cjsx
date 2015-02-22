class foo extends React.Component

	constructor: ->
		@state =
			foo: "bar"
			bar: 21

	render: ->
		foo = <foo bar="foo">
			<bar />
		</foo>
		if @props.foo
			foo = <bar foo>
				<foo>
					{foo.bar(7)}
				</foo>
			</bar>
		<foo bar={@props.bar}>
			<bar />
			{foo}
		</foo>
