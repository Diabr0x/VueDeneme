<template>
   <div :id="'app ' + secilenFiltre1.toLowerCase()" :class="secilenFiltre1.toLowerCase()">
    <!-- Başlık -->
    <b-container>
      <b-row class="header">
        <b-col>
          <h1 @click="toggleFilters">Dytown Giyim</h1>
        </b-col>
        <!-- Grafikleri Göster/Gizle Butonu -->
        <b-col class="toggle-button">
          <b-button @click="toggleCharts" variant="primary">{{ chartsVisible ? 'Grafikleri Gizle' : 'Grafikleri Göster' }}</b-button>
        </b-col>
      </b-row>

      <!-- Filtreler -->
      <b-row>
        <b-col>
          <b-card v-if="showFilters" class="filters-card">
            <div class="filters">
              <label for="filtre1">Cinsiyet:</label>
              <select id="filtre1" v-model="secilenFiltre1" @change="filtre1Degistir">
                <option v-for="secenek in filtre1Secenekleri" :key="secenek" :value="secenek">{{ secenek }}</option>
              </select>

              <label for="filtre2">Kategori:</label>
              <select id="filtre2" v-model="secilenFiltre2">
                <option v-for="secenek in filtre2Secenekleri" :key="secenek" :value="secenek">{{ secenek }}</option>
              </select>
            </div>
          </b-card>
        </b-col>
      </b-row>

      <!-- Seçili İçerik ve Ürün Resmi -->
      <b-row>
        <b-col>
          <b-card v-if="secilenFiltre1 && secilenFiltre2" class="selected-content-card">
            <h2>{{ secilenFiltre1 }} - {{ secilenFiltre2 }}</h2>
            <div v-if="icerik">
              <p>{{ icerik }}</p>
              <div class="urun-resimleri">
                <div v-for="(urun, index) in urunler" :key="index" class="urun">
  <img :src="urun.resim" alt="Ürün Resmi" class="urun-resmi"/>
  <p>{{ urun.isim }}</p>
  <p>{{ urun.fiyat }} TL</p>
  <b-button @click="addToCart(urun)" variant="primary" class="add-to-cart-button">Sepete Ekle</b-button>
</div>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>

      <!-- Grafikler Bölümü (koşullu olarak görüntülenir) -->
      <b-row v-if="chartsVisible">
        <b-col>
          <b-card class="chart-card">
            <apex-chart width="500" type="bar" :options="grafikAyarlar" :series="grafikSerisi"></apex-chart>
          </b-card>
        </b-col>
      </b-row>
      <b-row v-if="chartsVisible">
        <b-col>
          <b-card class="chart-card">
            <apex-chart width="500" type="line" :options="lineChartOptions" :series="lineChartSeries"></apex-chart>
          </b-card>
        </b-col>
      </b-row>
      <b-row v-if="chartsVisible">
        <b-col>
          <b-card class="chart-card">
            <apex-chart width="500" type="pie" :options="pieChartOptions" :series="pieChartSeries"></apex-chart>
          </b-card>
        </b-col>
      </b-row>

      <!-- Sepet İkonu ve İçeriği -->
      <div class="cart-container">
        <b-dropdown v-model="cartDropdownOpen" right>
          <template v-slot:button-content>
            <b-icon icon="cart-fill" font-scale="1.5"></b-icon>
            <span class="badge">{{ sepettekiUrunler.length }}</span>
          </template>
          <b-dropdown-item v-for="(urun, index) in sepettekiUrunler" :key="index">
            <img :src="urun.resim" alt="Ürün Resmi" class="cart-item-image" />
            <span>{{ urun.isim }}</span>
            <b-button @click.stop="removeFromCart(index)" size="sm" variant="danger">Sil</b-button>
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item v-if="!sepettekiUrunler.length">Sepetiniz boş.</b-dropdown-item>
          <b-dropdown-item v-if="sepettekiUrunler.length">
            <b-button block variant="success">Ödemeye Git</b-button>
          </b-dropdown-item>
        </b-dropdown>
      </div>

      <!-- Tablo Componenti -->
      <b-row>
        <b-col>
          <b-card class="table-card">
            <TableComponent />
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import TableComponent from './components/TableComponent.vue';

export default {
  name: 'App',
  components: {
    apexChart: VueApexCharts,
    TableComponent
  },
  data() {
    return {
      filtre1Secenekleri: ['Erkek', 'Kadın'],
      filtre2Secenekleri: [],
      secilenFiltre1: '',
      secilenFiltre2: '',
      icerik: '',
      urunler: [],
      grafikAyarlar: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos']
        },
        yaxis: {
          labels: {
            formatter: this.numberFormatter
          }
        }
      },
      grafikSerisi: [{
        name: 'Erkek',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }, {
        name: 'Kadın',
        data: [20, 35, 50, 60, 70, 80, 90, 100]
      }],
      lineChartOptions: {
        chart: {
          id: 'line-chart'
        },
        xaxis: {
          categories: ['Eylül', 'Ekim', 'Kasım', 'Aralık', 'Ocak', 'Şubat', 'Mart', 'Nisan']
        },
        yaxis: {
          labels: {
            formatter: this.numberFormatter
          }
        }
      },
      lineChartSeries: [{
        name: 'Erkek',
        data: [35, 45, 55, 65, 75, 85, 95, 105]
      }, {
        name: 'Kadın',
        data: [25, 30, 40, 50, 60, 70, 80, 90]
      }],
      pieChartOptions: {
        chart: {
          id: 'pie-chart'
        },
        labels: ['Erkek', 'Kadın'],
        dataLabels: {
          formatter: this.numberFormatter
        },
        legend: {
          position: 'bottom'
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true
              }
            }
          }
        },
        yaxis: {
          labels: {
            formatter: this.numberFormatter
          }
        }
      },
      pieChartSeries: [44, 55], // Erkek, Kadın satış miktarları
      chartsVisible: true, // Başlangıçta grafikleri göster
      showFilters: false, // Başlangıçta filtreleri gizle
      sepettekiUrunler: [], // Sepetteki ürünler
      cartDropdownOpen: false // Sepet dropdown açık/kapalı durumu
    };
  },
  methods: {
    numberFormatter(val) {
      if (val >= 1000) {
        return (val / 1000).toFixed(1) + 'K';
      }
      return val;
    },
    toggleCharts() {
      this.chartsVisible = !this.chartsVisible;
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    filtre1Degistir() {
      this.filtre2Guncelle();
      this.icerikGuncelle();
    },
    filtre2Guncelle() {
      if (this.secilenFiltre1 === 'Erkek') {
        this.filtre2Secenekleri = ['Tişört', 'Gömlek', 'Pantolon'];
      } else if (this.secilenFiltre1 === 'Kadın') {
        this.filtre2Secenekleri = ['Bluz', 'Elbise', 'Etek'];
      } else {
        this.filtre2Secenekleri = [];
      }
      this.secilenFiltre2 = '';
    },
    icerikGuncelle() {
      if (this.secilenFiltre1 === 'Erkek' && this.secilenFiltre2 === 'Tişört') {
        this.icerik = 'Erkek Tişörtleri için içerik';
        this.urunler = [{
            isim: 'Erkek Tişört 1',
            resim: 'https://w7.pngwing.com/pngs/881/62/png-transparent-black-t-shirt-t-shirt-black-model.png',
            fiyat: 49.99 
          },
          {
            isim: 'Erkek Tişört 2',
            resim: 'https://w7.pngwing.com/pngs/975/987/png-transparent-printed-t-shirt-clothing-top-mens-flat-material-tshirt-angle-fashion.png',
            fiyat: 59.99
          },
          {
            isim: 'Erkek Tişört 3',
            resim: 'https://w7.pngwing.com/pngs/667/92/png-transparent-blank-tshirt-male-fashion-top-clothes-man-thumbnail.png',
            fiyat: 69.99
          }
        ];
      } else if (this.secilenFiltre1 === 'Erkek' && this.secilenFiltre2 === 'Gömlek') {
        this.icerik = 'Erkek Gömlekleri için içerik';
        this.urunler = [{
            isim: 'Erkek Gömlek 1',
            resim: 'https://e7.pngegg.com/pngimages/994/851/png-clipart-dress-shirt-dress-shirt-thumbnail.png',
            fiyat: 89.99
            
          },
          {
            isim: 'Erkek Gömlek 2',
            resim: 'https://e7.pngegg.com/pngimages/675/717/png-clipart-man-s-grey-button-up-shirt-t-shirt-dress-shirt-dress-shirt-tshirt-blue.png',
            fiyat: 99.99
          },
          {
            isim: 'Erkek Gömlek 3',
            resim: 'https://w7.pngwing.com/pngs/248/711/png-transparent-t-shirt-dress-shirt-sleeve-collar-dress-shirt-blouse-sleeve-shirt-thumbnail.png',
            fiyat: 119.99
          }
        ];
      } else if (this.secilenFiltre1 === 'Erkek' && this.secilenFiltre2 === 'Pantolon') {
        this.icerik = 'Erkek Pantolonları için içerik';
        this.urunler = [{
            isim: 'Erkek Pantolon 1',
            resim: 'https://w7.pngwing.com/pngs/63/280/png-transparent-jeans-denim-slim-fit-pants-bell-bottoms-jeans-blue-fashion-boy.png',
            fiyat: 149.99
          },
          {
            isim: 'Erkek Pantolon 2',
            resim: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzzJUtcQTq6FCTEk2lh0UF58SbACGQLE5Hww&s',
            fiyat: 149.99
          },
          {
            isim: 'Erkek Pantolon 3',
            resim: 'https://cdn.sarar.com/mace-pantolon-11642-pamuk-ve-kanvas-pantolon-sarar-27168-11-B.jpg',
            fiyat: 159.99
          }
        ];
      } else if (this.secilenFiltre1 === 'Kadın' && this.secilenFiltre2 === 'Bluz') {
        this.icerik = 'Kadın Bluzları için içerik';
        this.urunler = [{
            isim: 'Kadın Bluz 1',
            resim: 'https://w7.pngwing.com/pngs/569/47/png-transparent-polka-dot-blouse-necktie-shirt-clothing-bezel-blouse-white-fashion-polka-thumbnail.png',
            fiyat: 149.99
          },
          {
            isim: 'Kadın Bluz 2',
            resim: 'https://w7.pngwing.com/pngs/682/42/png-transparent-shirt-clothing-sleeve-outerwear-blouse-stripes-photography-fashion-woman.png',
            fiyat: 149.99
          },
          {
            isim: 'Kadın Bluz 3',
            resim: 'https://w7.pngwing.com/pngs/36/382/png-transparent-t-shirt-top-sleeve-blouse-jeans-blue-white-fashion-thumbnail.png',
            fiyat: 149.99
          }
        ];
      } else if (this.secilenFiltre1 === 'Kadın' && this.secilenFiltre2 === 'Elbise') {
        this.icerik = 'Kadın Elbiseleri için içerik';
        this.urunler = [{
            isim: 'Kadın Elbise 1',
            resim: 'https://png.pngtree.com/png-vector/20230430/ourlarge/pngtree-dress-ladies-clothes-png-image_6747149.png',
            fiyat: 149.99
          },
          {
            isim: 'Kadın Elbise 2',
            resim: 'https://e7.pngegg.com/pngimages/30/498/png-clipart-the-dress-polka-dot-fashion-women-s-dresses-holidays-women-accessories-thumbnail.png',
            fiyat: 149.99
          },
          {
            isim: 'Kadın Elbise 3',
            resim: 'https://w7.pngwing.com/pngs/424/446/png-transparent-dress-gown-clothing-dress-blue-electric-blue-formal-wear.png',
            fiyat: 149.99
          }
        ];
      } else if (this.secilenFiltre1 === 'Kadın' && this.secilenFiltre2 === 'Etek') {
        this.icerik = 'Kadın Etekleri için içerik';
        this.urunler = [{
            isim: 'Kadın Etek 1',
            resim: 'https://e1.pngegg.com/pngimages/749/17/png-clipart-aesthetic-red-and-black-plaid-skirt.png',
            fiyat: 149.99
          },
          {
            isim: 'Kadın Etek 2',
            resim: 'https://e7.pngegg.com/pngimages/896/58/png-clipart-skirt-chiffon-woman-clothing-pleat-long-skirt-woman-black.png',
            fiyat: 149.99
          },
          {
            isim: 'Kadın Etek 3',
            resim: 'https://img.lovepik.com/free-png/20210919/lovepik-ladies-skirt-png-image_400467159_wh1200.png',
            fiyat: 149.99
          }
        ];
      } else {
        this.icerik = '';
        this.urunler = [];
      }
    },
    addToCart(product) {
      this.sepettekiUrunler.push(product);
    },
    removeFromCart(index) {
      this.sepettekiUrunler.splice(index, 1);
    },
    toggleCartDropdown() {
      this.cartDropdownOpen = !this.cartDropdownOpen;
    }
  },
  watch: {
    secilenFiltre2() {
      this.icerikGuncelle();
    }
  }
};
</script>


<style scoped>
/* Başlık ve Butonlar */
.header {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle-button {
  justify-content: flex-start;
  margin-right: auto; /* Sağ tarafa doğru genişletmek için */
}

.toggle-button .b-button {
  margin-right: 10px; /* Düğmeye sağdan boşluk ekle */
}

/* Filtre Kartı */
.filters-card {
  margin-bottom: 20px;
  background-color: #f5f5f5; /* Filtre kartı arkaplan rengi */
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filters label {
  margin-right: 10px;
}

/* Seçili İçerik Kartı */
.selected-content-card {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #ffffff; /* Seçili içerik kartı arkaplan rengi */
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center; /* İçeriği merkezlemek için */
}

.urun-resimleri {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Ürün resimlerini ortalamak için */
}

.urun {
  flex: 0 0 calc(25% - 20px); /* Ürün kartlarının genişliği */
  text-align: center;
  margin: 20px;
  padding: 30px;
  background-color: #f0f0f0; /* Ürün kartının arkaplan rengi */
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Hafif gölgelendirme */
  position: relative; /* Pozisyonu belirle */
}

.urun-resmi {
  width: 100%;
  height: auto;
  border-radius: 8px; /* Ürün resimleri için köşe yuvarlama */
}

.urun-bilgisi {
  margin-top: 10px; /* Bilgilerin üst boşluğu */
}

.urun-fiyat {
  font-weight: bold;
}

.add-to-cart-button {
  width: calc(100% - 20px); /* Genişlik hesaplaması */
  position: absolute; /* Mutlak pozisyon */
  bottom: 10px; /* Alt boşluk */
  left: 10px; /* Sol boşluk */
}

/* Sepet İkon ve İçerik */
.cart-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.cart-item-image {
  width: 50px;
  height: auto;
  margin-right: 10px;
  border-radius: 8px; /* Sepet öğe resimleri için köşe yuvarlama */
}

.badge {
  position: absolute;
  top: -8px;
  right: 0;
  font-size: 0.75rem;
  background-color: red;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 50%;
}

/* Tablo Kartı */
.table-card {
  margin-top: 20px;
  padding: 15px;
  background-color: #ffffff; /* Tablo kartı arkaplan rengi */
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* Grafik Kartları */
.chart-card {
  margin-top: 20px;
  padding: 15px;
  background-color: #ffffff; /* Grafik kartı arkaplan rengi */
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* Sepet dropdown butonu */
.b-dropdown-toggle {
  display: flex;
  align-items: center;
}

.b-dropdown-toggle .b-icon {
  margin-right: 5px;
}

.erkek {
  background-color: #cce6ff; /* Light blue for 'Erkek' */
}

.kadın {
  background-color: #ffcce6; /* Light pink for 'Kadın' */
}
</style>