# LCX AUTOS 网站部署指南（v0.4.1）

本工程采用 Next.js App Router、TypeScript、Tailwind CSS 与静态导出。`npm run build` 完成后，部署文件位于 `out/`。

## 推荐流程：GitHub + Vercel

### 1. 准备本地环境

安装 Node.js LTS 和 Git。解压工程后，在项目目录打开终端：

```bash
npm install
npm run typecheck
npm run build
```

构建成功后，先检查 `out/` 中的英文、中文、项目、研究与文章页面。

### 2. 建立 GitHub 仓库

在 GitHub 新建一个 Private 仓库，例如 `lcx-autos-website`。然后在工程目录执行：

```bash
git init
git add .
git commit -m "Initial LCX AUTOS website"
git branch -M main
git remote add origin https://github.com/<你的用户名>/lcx-autos-website.git
git push -u origin main
```

### 3. 导入 Vercel

1. 登录 Vercel。
2. 选择 **Add New → Project**。
3. 导入刚才的 GitHub 仓库。
4. Framework Preset 选择 **Next.js**。
5. Build Command 保持 `next build` 或 `npm run build`。
6. 点击 Deploy。

首次部署后会获得一个 `*.vercel.app` 预览地址。以后向 `main` 分支推送代码会自动生成新的生产部署；其他分支和 Pull Request 会生成独立预览。

### 4. 绑定域名

建议优先购买 `lcxautos.com`，同时将 `www.lcxautos.com` 加入同一项目。购买前请在域名注册商或 Vercel 中实时查询可用性。

在 Vercel 项目中打开 **Settings → Domains**：

1. 添加 `lcxautos.com`。
2. 添加 `www.lcxautos.com`。
3. 按页面提示在域名注册商处设置 A、CNAME 或 Nameserver 记录。
4. 将其中一个设为主域名，另一个做 301 重定向。
5. 等待 DNS 验证和 HTTPS 证书自动签发。

请以 Vercel 页面显示的 DNS 值为准，不要长期复制旧教程中的固定记录。

### 5. 上线前修改

把以下文件中的占位域名改为正式域名：

- `app/layout.tsx` 中的 `metadataBase`
- `app/sitemap.ts`
- `app/robots.ts`
- `app/manifest.ts`

并检查：

- 联系邮箱：`18221668367@163.com`
- 中英文切换
- 7 个研究全文页面
- 8 个文章全文页面
- 手机端菜单与长文排版
- 图片和视频加载
- DOI 外链

### 6. 日常更新

修改 `content/*.json` 和 `content/fulltext/*.html`，或添加项目媒体文件。随后执行：

```bash
git add .
git commit -m "Update content"
git push
```

Vercel 会自动构建并发布。需要撤回时，可以在 Vercel Deployments 页面选择上一版并重新设为 Production。

## 不使用 GitHub 的临时部署

也可以在本地运行 `npm run build`，将整个 `out/` 文件夹上传到任意静态托管服务。不过这种方式缺少分支预览、自动构建和版本回滚，适合临时测试。
