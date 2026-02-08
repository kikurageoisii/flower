#include <stdio.h>
#include <string.h>//for strcmp

void sortWords(char *word_ptr[], const int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (strcmp(word_ptr[j], word_ptr[j + 1]) > 0) { //辞書の順番だと正
                char *temp = word_ptr[j];
                word_ptr[j] = word_ptr[j + 1]; //*(住所)=*(住所) 
                word_ptr[j + 1] = temp; //*=*
            }
        }
    }
}

int main() {
    const int num_words = 10;               // Number of words
    const int max_length = 100;             // Maximum length of a word
    char words[num_words][max_length];      // Array to store words
    char *word_ptr[num_words];              // Array of pointers

    // Input words
    for (int i = 0; i < num_words; i++) {
        scanf("%s", words[i]);              // Input a word
        word_ptr[i] = words[i];             // Store the pointer
    }

    sortWords(word_ptr, num_words);          // Sort the words

    // Output sorted words
    for (int i = 0; i < num_words; i++) {
        printf("%s ", word_ptr[i]);
    }
    printf("\n");

    return 0;
}