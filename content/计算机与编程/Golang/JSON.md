# Golang JSON 解析与序列化

## `omitempty`

[Go's "omitempty" explained](https://www.sohamkamani.com/blog/golang/2018-07-19-golang-omitempty/)

Example

```go
package main

import (
	"encoding/json"
	"fmt"
)

type example struct {
	Bool    bool    `json:"bool,omitempty"`
	BoolPtr *bool   `json:"boolPtr,omitempty"`
	Num     int     `json:"num,omitempty"`
	NumPtr  *int    `json:"numPtr,omitempty"`
	Str     string  `json:"str,omitempty"`
	StrPtr  *string `json:"strPtr,omitempty"`
}

func main() {
	/**
	 * zero value
	 */
	b1 := false
	n1 := 0
	s1 := ""

	v1 := example{
		Bool:    b1,
		BoolPtr: &b1,
		Num:     n1,
		NumPtr:  &n1,
		Str:     s1,
		StrPtr:  &s1,
	}

	str1, _ := json.Marshal(v1)

	// {"boolPtr":false,"numPtr":0,"strPtr":""}
	fmt.Println(string(str1))


	/**
	 * non-zero value
	 */
	b2 := true
	n2 := 1
	s2 := "a"

	v2 := example{
		Bool:    b2,
		BoolPtr: &b2,
		Num:     n2,
		NumPtr:  &n2,
		Str:     s2,
		StrPtr:  &s2,
	}

	str2, _ := json.Marshal(v2)

	// {"bool":true,"boolPtr":true,"num":1,"numPtr":1,"str":"a","strPtr":"a"}
	fmt.Println(string(str2))
}

```

## 结构体匿名成员

```go
package main

import (
	"encoding/json"
	"fmt"
)

func main() {
	type subtype struct {
		A string `json:"a"`
	}

	type supertype struct {
		subtype
		B string `json:"b"`
	}

	v := supertype{
		subtype: subtype{A: "a"},
		B:       "b",
	}

	s, _ := json.Marshal(v)

    // {"a":"a","b":"b"}
	fmt.Println(string(s))
}
```
