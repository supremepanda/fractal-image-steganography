# Understanding the Theory of Backend Side

Stegonagrafi aslında bir yazım yöntemi olması ile birlikte günümüzde veri saklamak gibi amaçlarla kullanılabilmektedir. Bu projede yaptığımız çalışma bir resim içerisine yazı içeriği gömmek ve bunu yaparken resmin gözle görülür bir şekilde değişmesini engellemektir.

Resim üzerine veri saklama üzerine yapılan stegonagrafinin tek bir yöntem ile sınırlandırılabilmesi söz konusu değildir. Fakat resim içeriğinin gözle görülür bir miktarda değişmemesi sebebiyle yapılan işlerin bit derinliğinde olduğunu söyleyebiliriz.

# Basics

Bu konuyu anlamak için öncelikle binary, bit ve byte tanımlarını bilmek gerekiyor.

`Binary` = 1 ya da 0 olarak kullanılan değerlerdir, bir diğer söyleyiş şekli ile 2 li sistemler denir.
`Bit` = 1 ya da 0 dır. Binary sistemini kullanarak yazılır. 1 bit en küçük birimdir denilebilir.
`Byte` = 8 adet 'bit' anlamına gelir. Örnek olarak `10111011` = 1 byte eder.

# Image Basics

Resim konusu çok detaylı anlatılabilir, farklı yöntemler de vardır, fakat bu projede RGB dediğimiz `red`, `green` ve `blue` renklerinin sayısal değerleri ile hesap yapmaktayız. 

1 resim içerisinde binlerce veya milyonlarca pixel bulunmaktadır. Örnek olarak 300x500 lük bir resim içeriği yatayda 300, dikeyde 500 birim olarak toplamda 150000 pixelden oluşur.

Her bir pixel ise kendi içinde red, green ve blue değerlerine sahiptir. Bu değerler genellikle **0-255** arası değerlerdir. Örnek olarak bir pixel:

    red: 255
    green: 2
    blue: 100

şeklinde olmaktadır.

# String Basics

Bu proje için önemli olan bir diğer type `string` dir. String yapı olarak primitive bir type değildir ve bir primitive type olan `char` lardan oluşur. 
`1 char = 1 byte` eder. Bu projenin altın bilgileri arasında yer alır.

# Stenography Method

Projede temel olarak 3 farklı fonksiyon kullanılmaktadır. Bunlar

 - Convert To Binary
 - Encode the image with secret data
 - Decode the image

# Converting To Binary

Verilen data yı 8-bit binary şekline çevirme aşamasıdır. Bu sayede yazıdaki bir `char` ve resimdeki `RGB` değerleri aynı formatta olduğundan birlikte işlem yapılabilmektedir.

Örneğin, `supremepanda` = **01110011 01110101 01110000 01110010 01100101 01101101 01100101 01110000 01100001 01101110 01100100 01100001** 

`222` = **11011110**

eşitlikleri inceleyebilirsiniz. 

Binary çevirme kodu:

    def  convert_to_binary(data):
	    if  isinstance(data, str):
		    return  ''.join([ format(ord(i), "08b") for i in data ])
	    elif  isinstance(data, bytes) or  isinstance(data, np.ndarray):
		    return [ format(i, "08b") for i in data ]
	    elif  isinstance(data, int) or  isinstance(data, np.uint8):
			return  format(data, "08b")
		else:
			raise  TypeError("Type not supported.")
# Encode the Image with Secret Data

 Resim üzerinde yapılan encode işleminin temelde iki önemli koşulu var:
 

 - Resim içeriğini bozmamak
 - Veriyi düzgün bir şekilde kayıt edebilmek

Saklanacak olan verimize onun bittiğine dair bir işaret koyulması gerekli. Bunun sebebi decode ederken elimizde bu `secret_key` olmazsa verinin nerede sonlandığını anlamamız mümkün olmayacaktır. Daha sonra, resmin boyutu ve embed edilecek verinin boyutu arasında karşılaştırma yapılması gerekmektedir. Bunun sebebi eğer embed yapacağımız yazının resimden daha büyük olması durumunda yazıyı saklamanın mümkün olmamasıdır. 

    image = cv2.imread(image_path)
    try:
        byte_count = image.shape[0] * image.shape[1] * 3 // 8
    except AttributeError:
        return {"status": False, "data": "Image is not valid."}

    secret_data += secret_key

    if len(secret_data) > byte_count:
        return {"status": False, "data": "Insufficient bytes, Data to be added should have less size, or image should have more size"}


Bundan sonra `secret_data` nın binary formatına çevirilmesi ile aksiyona başlanıyor.

    binary_secret_data = convert_to_binary(secret_data)

Secret data binary formatına çevirildikten sonra artık elimizde resmin içerisine gizlenecek verinin yazılması gerekiyor. Bu amaçla bir resmin içerisindeki her bir pixeli satırlar halinde dizilmiş şekilde düşünmemiz, her bir pikselin de RGB değere sahip olduğunu bilmeliyiz. 

Veri gizlemedeki temel fakat en önemli mantık asıl veriyi gözle görülür bir biçimde bozmamak ve veriyi belirli bir kural çerçevesinde pixellere yerleştirmek. 

Yapılan yöntem ise; her bir `red`, `green` ve `blue` değerine sırayla yapılıyor. 

Örneğin red değerimiz decimal olarak 255 olsun. 255 in 8-bit binary karşılığı **11111111** Bizim gizlemek istediğimiz verimizin ilk biti ise **0** olsun. Yeni `red` değerimiz 1111111**0** olacaktır. Bu işlem saklayacağımız veri tükenene kadar devam eder.
	
    secret_data_index = 0
    data_len = len(binary_secret_data)
    for  row  in  image:
	    for  pixel  in  row:
			color_index = 0
		    red, green, blue = convert_to_binary(pixel)
			for color in [red, green, blue]:
                if secret_data_index >= data_len:
                    break

                pixel[color_index] = int(color[:-1] + binary_secret_data[secret_data_index], 2)
                secret_data_index += 1
                color_index += 1
# Decode the Image

Decode etme işlemi ile resmimize gizlediğimiz yazı içeriğini gün yüzüne çıkartabilmekteyiz. Decode yapabilmek için nasıl encode edildiğinin bilinmesi gerekiyor. Bizim encode uygulamamızda pixellerdeki RGB değerlerin son bitine veri gizleme yolunu kullanmıştık. En sonuna da `secret_key` kullanarak bittiğini göstermiştik. Bu aşamada yapılacak olan bu kurala göre basit bir arama algoritması kurmak.

Öncelikle secret datamızı en son bitlerde aradığımız için resmin bütün bitlerini elimizde topluyoruz. 

    for  row  in  image:
	    for  pixel  in  row:
		    red, green, blue = convert_to_binary(pixel)
			    binary_secret_data += red[-1]
			    binary_secret_data += green[-1]
			    binary_secret_data += blue[-1]
Daha sonra elimizde binary cinsinden datayı 8-bit şeklinde split etmemiz gerekiyor. Bunun sebebi split edilen her 8 lik byte bir karakter edecek, ve o karakterler bizim gizli verimizin parçaları.

    all_bytes = [ binary_secret_data[i: i+8] for  i  in  range(0, len(binary_secret_data), 8) ]
    decoded_data = ""
    for  byte  in  all_bytes:
		decoded_data += chr(int(byte, 2))
		if  decoded_data[-len(secret_key):] == secret_key:
			break
	return  decoded_data[:-len(secret_key)]