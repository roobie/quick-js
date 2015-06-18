FORMAT: 1A

# Resource and Actions API
This API example demonstrates how to define a resource with multiple actions.

## API Blueprint
+ [Previous: The Simplest API](01.%20Simplest%20API.md)
+ [This: Raw API Blueprint](https://raw.github.com/apiaryio/api-blueprint/master/examples/02.%20Resource%20and%20Actions.md)
+ [Next: Named Resource and Actions](03.%20Named%20Resource%20and%20Actions.md)

# /item/list
This is our [resource](http://www.w3.org/TR/di-gloss/#def-resource). It is defined by its [URI](http://www.w3.org/TR/di-gloss/#def-uniform-resource-identifier) or, more precisely, by its [URI Template](http://tools.ietf.org/html/rfc6570).

## GET
As with every good action it should return a [response](http://www.w3.org/TR/di-gloss/#def-http-response).

+ Response 200 (application/json)

        [
          { "id": 0, "name": "A"},
          { "id": 1, "name": "A"},
          { "id": 2, "name": "A"},
          { "id": 3, "name": "A"},
          { "id": 4, "name": "A"},
          { "id": 5, "name": "A"}
        ]

## PUT
Update item

+ Request (application/json)

        { "name": "B" }

+ Response 204
