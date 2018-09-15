<template>
  <el-row id="base_import">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/import">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">信息管理</el-row>

    <el-tabs v-model="tab" type="border-card">
      <el-tab-pane label="食品经营信息" name="biz">
        <el-row style="font-size:18px;margin-bottom:15px;" class="section">将数据导出</el-row>
        <el-row>
          <el-button size="small" icon="el-icon-document" type="primary">导出为excel</el-button>
          <el-button size="small" icon="el-icon-upload2" type="primary">通过接口导出</el-button>
          <el-button size="small" icon="el-icon-printer">批量打印</el-button>
        </el-row>
        <el-row style="font-size:18px;margin-bottom:15px;" class="section">从其他平台/接口导入</el-row>
        <el-row>
          <el-button size="small" icon="el-icon-download" type="primary">导入数据</el-button>
        </el-row>
        <el-row style="font-size:18px;margin-bottom:15px;" class="section">从Excel导入</el-row>
        <el-row>
          <el-upload class="upload-demo" drag action="/">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">可以上传.xls/.xlsx文件</div>
          </el-upload>
          <el-row style="margin-top:15px;">
            <el-button size="small" icon="el-icon-upload" type="primary">确认上传</el-button>
          </el-row>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="小作坊信息" name="workshop">
        <el-row style="font-size:18px;margin-bottom:15px;" class="section">将数据导出</el-row>
        <el-row>
          <el-button size="small" icon="el-icon-document" type="primary">导出为excel</el-button>
          <el-button size="small" icon="el-icon-upload2" type="primary">通过接口导出</el-button>
          <el-button size="small" icon="el-icon-printer">批量打印</el-button>
        </el-row>
        <el-row style="font-size:18px;margin-bottom:15px;" class="section">从其他平台/接口导入</el-row>
        <el-row>
          <el-button size="small" icon="el-icon-download" type="primary">导入数据</el-button>
        </el-row>
        <el-row style="font-size:18px;margin-bottom:15px;" class="section">从Excel导入</el-row>
        <el-row>
          <el-upload class="upload-demo" drag action="/">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">可以上传.xls/.xlsx文件</div>
          </el-upload>
          <el-row style="margin-top:15px;">
            <el-button size="small" icon="el-icon-upload" type="primary">确认上传</el-button>
          </el-row>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="网上商家信息" name="netshop">
        <el-row style="font-size:18px;margin-bottom:15px;" class="section">网上商家数据库</el-row>
        <el-row>
          <el-button size="small" icon="el-icon-news" type="primary">更新网上商家信息</el-button>
          <span style="    margin-left: 10px;font-size: 10px;">最后更新于2018-09-12 14:35</span>
        </el-row>
        <el-row style="font-size:18px;margin-bottom:15px;" class="section">将数据导出</el-row>
        <el-row>
          <el-button size="small" icon="el-icon-document" type="primary">导出为excel</el-button>
          <el-button size="small" icon="el-icon-upload2" type="primary">通过接口导出</el-button>
          <el-button size="small" icon="el-icon-printer">批量打印</el-button>
        </el-row>
        <el-row style="font-size:18px;margin-bottom:15px;" class="section">从其他平台/接口导入</el-row>
        <el-row>
          <el-button size="small" icon="el-icon-download" type="primary">导入数据</el-button>
        </el-row>
        <el-row style="font-size:18px;margin-bottom:15px;" class="section">从Excel导入</el-row>
        <el-row>
          <el-upload class="upload-demo" drag action="/">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">可以上传.xls/.xlsx文件</div>
          </el-upload>
          <el-row style="margin-top:15px;">
            <el-button size="small" icon="el-icon-upload" type="primary">确认上传</el-button>
          </el-row>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="许可证数据库" name="licence">
        <el-row style="font-size:18px;margin-bottom:15px;" class="section">将数据导出</el-row>
        <el-row>
          <el-button size="small" icon="el-icon-document" type="primary">导出为excel</el-button>
          <el-button size="small" icon="el-icon-upload2" type="primary">通过接口导出</el-button>
          <el-button size="small" icon="el-icon-printer">批量打印</el-button>
        </el-row>
        <el-row style="font-size:18px;margin-bottom:15px;" class="section">从其他平台/接口导入</el-row>
        <el-row>
          <el-button size="small" icon="el-icon-download" type="primary">导入数据</el-button>
        </el-row>
        <el-row style="font-size:18px;margin-bottom:15px;" class="section">从Excel导入</el-row>
        <el-row>
          <el-upload class="upload-demo" drag action="/">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">可以上传.xls/.xlsx文件</div>
          </el-upload>
          <el-row style="margin-top:15px;">
            <el-button size="small" icon="el-icon-upload" type="primary">确认上传</el-button>
          </el-row>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script>
import { copy } from "@/utils/utils.js";
export default {
  name: "base_import",
  data() {
    return {
      tab: "biz"
    };
  }
};
</script>
