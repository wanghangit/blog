; 求平方
(define (sqare x)
  (* x x)
)
; 求平均值
(define (average x y)
  (/ (+ x y) 2)
)
(define (abs x)
  (if (< x 0) (- x) x)
)
(define (sqrt x)
  (sqrt-it 1 x)
)
; 是否是足够好
(define (isgood guess x)
  (< (abs (- (sqare guess) x)) 0.1)
)
(define (improve guess x)
  (average guess (/ x guess))
)
(define (sqrt-it guess x)
  (if (isgood guess x)
    guess
    (sqrt-it (improve guess x) x)
  )
)

(sqrt 4)
