<template>
  <div class="clearfix">
    <a-upload
      :custom-request="postImage"
      list-type="picture-card"
      :file-list="fileList"
      :remove="handleRemove"
      :before-upload="beforeUpload"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < 1">
        <a-icon type="camera" />
        <!-- <div class="ant-upload-text">Upload</div> -->
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
    <div class="icons-list"></div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import { mapGetters, mapActions } from "vuex";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  props: {
    sendImage: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      fileList: [],
      currentUrlUpload: "",
      currentIdImage: "",
      typeImageCurrent: "",
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }

      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      if (fileList.length == 1) {
        this.fileList = fileList;

        try {
          let linksArr = this.fileList.map((item) => item.response);

          this.$emit("getLinkImage", linksArr);
        } catch (e) {
          console.log(e);
        }
      }

      if (this.fileList.length == 0) {
        this.$emit("getLinkImage", []);
      }

      if (this.fileList.length > 1) {
        this.$emit("getLinkImage", []);
      }
    },
    async postImage({ onSuccess, onError, file }) {
      await firebase
        .storage()
        .ref()
        .child("products/" + Date.now())
        .put(file)
        .then((link) => {
          return link.ref.getDownloadURL();
        })
        .then((downloadUrl) => {
          this.$emit("getLinkImage", downloadUrl);
          onSuccess(downloadUrl, file);
        })
        .catch(() => onError("error"));
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";

      this.typeImageCurrent = isJpgOrPng ? file.type : "";
      console.log(this.typeImageCurrent);

      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }

      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isLt2M) {
        this.$message.error("Image must smaller than 10 MB!");
      }

      return isJpgOrPng && isLt2M;
    },
    async handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();

      newFileList.splice(index, 1);
      this.fileList = newFileList;

      await this.deleteImage({ id: this.sendImage.id, imageUrl: file.url });
    },
    ...mapActions(["deleteImage"]),
  },
  computed: {
    ...mapGetters([""]),
  },
  created: function () {
    console.log("created hook", this.sendImage);
    // if (this.sendImage) {
    //   this.fileList[0] = {
    //     uid: 0,
    //     name: `image_${0}`,
    //     status: "done",
    //     url: this.sendImage[0],
    //     id: 0,
    //   };
    // }
  },
};
</script>

<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
