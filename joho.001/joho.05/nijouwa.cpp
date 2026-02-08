#include <iostream>
using namespace std;

int jijowa(int n){
    int k=0;
    for(int i=0;i<=n;i++){
        k+=i*i;
    }
    return k;
}

int main(void)
{
    int n = 0;
    cin >> n;
    cout << jijowa(n) << endl;
    return 0;
}
