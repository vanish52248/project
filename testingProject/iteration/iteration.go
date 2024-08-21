package iteration

func Repeat(n int, s string) string {
	repeated := ""
	for i := 0; i < n; i++ {
		repeated += s
	}
	return repeated
}
