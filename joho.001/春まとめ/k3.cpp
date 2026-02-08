#include <stdio.h>
#include <cstring>//for strcmp


void sortWords(char * array[],const int size) {

    for(int j=0;j<size-1;j++){
        for(int i=0;i<size-j-1;i++){
            if(strcmp(array[i],array[i+1])>0){
                char* temp = array[i];
                array[i]=array[i+1];
                array[i+1]=temp;
                }
        }
    
    }
}

int main() {
    const int num_words = 10;               //単語の数
    const int max_length = 100;             //単語の最大長
    char words[num_words][max_length];      //単語を格納する配列
    char* word_ptr[num_words];              //ポインタの配列

    // 単語を入力
    for (int i = 0; i < num_words; i++) {
        scanf("%s", words[i]);              //単語を入力
        word_ptr[i] = words[i];             //ポインタを格納
    }

    sortWords(word_ptr, num_words);          //単語をソート

    // ソートされた単語を出力
    for (int i = 0; i < num_words; i++) {
        printf("%s ", word_ptr[i]);         
    }
    printf("\n");
    return 0;
}