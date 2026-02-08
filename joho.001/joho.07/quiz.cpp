#include <iostream>
using namespace std;

void read_array (int a[],int n){ //この時点ではconst使ってはいけない
    for(int i=0;i<n;i++){
        cin>>a[i];
    }
}

void write_array(const int a[],int n){
    for(int i=0;i<n;i++){
        cout<<a[i]<<endl;
    }
}

int find_max(const int a[],int n){
    int i_max=0;
    for(int i=0;i<n;i++){
        if(a[i_max]<a[i]){
            i_max=i;
        }else if(a[i_max]==a[i]){
            
        }
    }                                                   
    return i_max;
}

int the_next_of_max(const int a[], int n){
    int ans[n];
    
    
}

int main(void){
    int n=10;
    int a[n+1]; //配列は１個大きく作る。エラーを防ぐため。
    read_array(a,n); //a[n]はaの先頭アドレス
    write_array(a,n);
    a[find_max(a,n)];
}

