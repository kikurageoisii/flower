#include <iostream>
using namespace std;

int tosa(int a, int d, int n)
{
    return a+d*(n-1);
}

int main(void)
{
    int a = 0;
    int d = 0;
    int n = 0;

    cin >> a >> d >> n;
    cout << tosa(int (a), int (d), int (n)) << endl;

    return 0;
}
