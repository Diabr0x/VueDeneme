<template>
  <div>
    <b-card class="table-card">
      <h2 style="font-weight: bold; margin-bottom: 20px;">Kıyafet Satış Tablosu</h2>
      <b-button @click="toggleTable" variant="primary" class="mb-3">
        {{ tableVisible ? 'Tabloyu Gizle' : 'Tabloyu Göster' }}
      </b-button>
      <b-table v-if="tableVisible" :items="items" :fields="fields" responsive="sm" class="mt-3">
        <template v-slot:cell(data)="data">
          <div v-if="data.item[data.field.key] && data.item[data.field.key].length > maxLength" class="tooltip-container">
            <span class="truncated-text" :id="'tooltip-' + data.index + '-' + data.field.key">
              {{ truncateText(data.item[data.field.key]) }}
            </span>
            <b-tooltip :target="'tooltip-' + data.index + '-' + data.field.key" placement="top">
              {{ data.item[data.field.key] }}
            </b-tooltip>
          </div>
          <div v-else>
            {{ data.item[data.field.key] }}
          </div>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { ay: 'Ocak', erkek: 30, kadın: 20 },
        { ay: 'Şubat', erkek: 40, kadın: 35 },
        { ay: 'Mart', erkek: 45, kadın: 50 },
        { ay: 'Nisan', erkek: 50, kadın: 60 },
        { ay: 'Mayıs', erkek: 49, kadın: 70 },
        { ay: 'Haziran', erkek: 60, kadın: 80 },
        { ay: 'Temmuz', erkek: 70, kadın: 90 },
        { ay: 'Ağustos', erkek: 91, kadın: 100 },
      ],
      fields: [
        { key: 'ay', label: 'Ay' },
        { key: 'erkek', label: 'Erkek' },
        { key: 'kadın', label: 'Kadın' },
      ],
      maxLength: 10,
      tableVisible: true,
    };
  },
  methods: {
    truncateText(text) {
      return text.length > this.maxLength ? text.substring(0, this.maxLength) + '...' : text;
    },
    toggleTable() {
      this.tableVisible = !this.tableVisible;
    }
  },
};
</script>

<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
}

.truncated-text {
  display: inline-block;
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.table-card {
  margin-top: 20px;
  padding: 15px;
  background-color: #ffffff; /* Tablo kartı arkaplan rengi */
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
