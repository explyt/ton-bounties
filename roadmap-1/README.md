This folder contains examples of using TL-B scheme for contract input parameters.
Each example contains a `types.tlb` file with TL-B scheme and a few files with smart contracts written in FunC, 
with correct (according to the TL-B scheme) and incorrect parsing of incoming messages:

- [addr_and_uint](addr_and_uint) contains [one example of correct parsing](addr_and_uint/correct.fc) and 
    3 examples of incorrect parsing with different errors - [using int instead of uint](addr_and_uint/int_instead_of_uint.fc),
    [too early end of parsing](addr_and_uint/premature_end_parse.fc), and [unexpected ref loading](addr_and_uint/unexpected_load_ref.fc);
- [int_switch](int_switch) contains [one example of parsing without possible errors](int_switch/int_switch_correct.fc)
    and [example of possible error during parsing](int_switch/int_switch_wrong.fc);
- [maybe_ref](maybe_ref) contains two examples of correct parsing in different ways - [1](maybe_ref/correct_1.fc) and [2](maybe_ref/correct_2.fc)
    and two examples of incorrect parsing - [without reading maybe bit](maybe_ref/load_without_maybe.fc) and 
    [too early end of parsing](maybe_ref/premature_end_parse.fc).
