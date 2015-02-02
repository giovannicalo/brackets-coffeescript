class foo extends bar

	###
	constructor
	###
	constructor: (foo = null, @bar) ->
		@foo foo, 'bar', 7

	#foo
	foo: (bar) ->
		if bar isnt undefined and bar.foo() is null
			for foo in bar.bar
				@bar(foo[bar]).then (foo) ->
					bar[foo] += 12
					foo.bar = "
					foo
					bar
					"
					bar.foo = "foo #{foo.bar() / @bar + 2} bar"
				, =>
					foo = @bar().match /^[abfor]+/g
					bar = @foo().replace ///
						(
							foo
							|
							bar
						)
						:
						[a-z]* #comment
					///im
					, (match) ->
						match.toLowerCase()

	#bar
	bar: (foo) ->
		bar++ for bar in foo
		foo[7] =
			foo: 4
			bar: [
				12
				"foo"
			]
